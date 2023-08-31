<?php
	/**
		Fachada del backend de la aplicación.
		Su responsabilidad es procesar la petición HTTP para decidir a qué controlador llamar (routing).
		También identifica al usuario (autenticación).
		Es un interfaz RESTful (https://www.rfc-editor.org/rfc/rfc7231)
	**/
	//echo 'PHP version: ' . phpversion();die();

	//Cargamos la configuración
	$config = require_once('config.php');
	if ($config['debug']){
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);
	}

	try{
		//Inyección de dependencias
		require_once('./servicios/bd.php');
		BD::$host = $config['host'];
		BD::$bd = $config['bd'];
		BD::$usuario = $config['usuario'];
		BD::$clave = $config['clave'];
		require_once('./controladores/tarea.php');
		Tarea::$email_aviso = $config['email_aviso'];

		//Peticiones especiales de depuración
		if ($config['debug']){
			if ($_SERVER['QUERY_STRING'] == 'cargarBDPruebas'){
				$salida = [];
				//Establecemos los locales
				$locale='es_ES.UTF-8';
				setlocale(LC_ALL,$locale);
				putenv('LC_ALL='.$locale);
				//echo exec('locale charmap');
				exec('mysql -u '.BD::$usuario.' --password='.BD::$clave.' '.BD::$bd.' < ../../sql/datos_prueba.sql', $salida);
				die('Cargada BD Pruebas.');
			}
		}

		//Procesamos la petición para identificar el recurso solicitado y sus parámetros
		$metodo = $_SERVER['REQUEST_METHOD'];
		$pathParams = explode('/', $_SERVER['PATH_INFO']);
		$queryParams = [];
		parse_str($_SERVER['QUERY_STRING'], $queryParams);
		$recurso = $pathParams[1];	//El primer elemento es la /.
		array_splice($pathParams, 0, 2);	//Quitamos la / y el recurso solicitado.
		//Procesamos los nulos
		for($i = 0; $i < count($pathParams); $i++)
			if ($pathParams[$i] == 'null')
				$pathParams[$i] = null;
		$body = json_decode(file_get_contents('php://input'));

		//Autenticación
		$usuario = null;
		require_once('./controladores/login.php');
		//Inyección de dependencias
		Login::$clave = $config['clave_encriptacion'];
		Login::$algoritmo_encriptacion = $config['algoritmo_encriptacion'];
		if(array_key_exists('Authorization2', apache_request_headers())){
			$autorizacion = apache_request_headers()['Authorization2'];
			if ($autorizacion != "null")
				$usuario = json_decode(Login::desencriptar($autorizacion));
		}

		//Logging
		if ($config['log']){
			require_once('./servicios/log.php');
			Log::registrar($usuario, $recurso, $metodo, $pathParams, $queryParams, $body);
		}

		//Routing
		$controlador = false;
		switch($recurso){
			case 'login':
				require_once('./controladores/login.php');
				$controlador = new Login();
				break;
			case 'alumno':
				require_once('./controladores/alumno.php');
				$controlador = new Alumno();
				break;
			case 'tarea':
				require_once('./controladores/tarea.php');
				$controlador = new Tarea();
				break;
			case 'informe':
				require_once('./controladores/informe.php');
				$controlador = new Informe();
				break;
			case 'actividad':
				require_once('./controladores/actividad.php');
				$controlador = new Actividad();
				break;
			case 'modulo':
				require_once('./controladores/modulo.php');
				$controlador = new Modulo();
				break;
			case 'calificacion':
			case 'curso':
			case 'periodo':
				require_once('./controladores/general.php');
				$controlador = new Controlador($recurso);
				break;
			default:
				header('HTTP/1.1 501 Not Implemented');
				die();
		}
		if ($controlador)
			switch($metodo){
					case 'GET':
						$controlador->get($pathParams, $queryParams, $usuario);
						die();
					case 'POST':
						$controlador->post($pathParams, $queryParams, $body, $usuario);
						die();
					case 'DELETE':
						$controlador->delete($pathParams, $queryParams, $usuario);
						die();
					case 'PUT':
						$controlador->put($pathParams, $queryParams, $body, $usuario);
						die();
					default:
						header('HTTP/1.1 501 Not Implemented');
						die();
			}
		else{
			header('HTTP/1.1 501 Not Implemented');
			die();
		}
	}catch(Throwable $excepcion){	//Throwable (interfaz) incluye Error y Exception
		header('HTTP/1.1 500 Internal Server Error 1');
		echo $excepcion;
		die();
	}
