<?php
/**
	Controlador de autenticación.
	Ref: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
**/

require_once 'vendor/autoload.php';
require_once('./daos/daousuario.php');
require_once('./modelos/usuario.php');

class Login{
	//Se configura por inyección de dependencias
	public static $clave = null;
	public static $algoritmo_encriptacion = null;
	public static $iv = 'PantUfl45--;jeu$';
	//Id de cliente de Google.
	private static $ID_CLIENTE = '756573648994-cn4uk8gsic003hnotjb9mpt1mjtnqvgm.apps.googleusercontent.com';

	/**
		Autentifica al usuario con el email y la clave.
		Devuelve por HTTP el objeto usuario en formato JSON.
		@param $pathParams No utilizado.
		@param $queryParams No utilizado.
		@param $token Token de login de Google.
	**/
	function post($pathParams, $queryParams, $token){
		global $config;
		if ($config['test'] && strpos($token, 'fundacionloyola')) {
			$payload = [];
			$payload['email'] = $token;
			$payload['given_name'] = '-';
			$payload['family_name'] = '-';
		}
		else{
			$client = new Google_Client(['client_id' => self::$ID_CLIENTE]);
			$payload = $client->verifyIdToken($token);
			if (!$payload) {
				// Invalid ID token
				header('HTTP/1.1 401 Unauthorized');
				die();
			}
			//El usuario ha sido identificado por Google
		}
		$usuario = DAOUsuario::autenticar($payload['email']);
		sleep(1);
		if (!$usuario){
      		header('HTTP/1.1 401 Unauthorized');
      		die();
    	}
		//Completamos los datos del usuario
		$usuario->email = $payload['email'];
		$usuario->autorizacion = openssl_encrypt(json_encode($usuario), self::$algoritmo_encriptacion, self::$clave, 0, self::$iv);
    	//print_r(openssl_get_cipher_methods()); //Muestra los algoritmos de encriptación disponibles

		header('Content-type: application/json; charset=utf-8');
    	header('HTTP/1.1 200 OK');
    	echo json_encode($usuario);
    	die();
	}
	/**
		Desencripta un mensaje.
		@param {String} $mensaje El texto del mensaje a desencriptar.
		@return {String} Texto del mensaje desencriptado o false si no se pudo desencriptar.
	**/
	public static function desencriptar($mensaje) {
			return openssl_decrypt($mensaje, self::$algoritmo_encriptacion, self::$clave, 0, self::$iv);
	}
}
