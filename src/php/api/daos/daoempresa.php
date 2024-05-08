<?php
	/**
		DAO de Empresas.
		Objeto para el acceso a los datos relacionados con las empresas.
	**/

class DAOEmpresa{
/**
		Inserta una nueva empresa.
		@param empresa {Empresa} Datos de la empresa a insertar.
		@return id {Integer} Identificador de la empresa insertada.
	**/
	public static function insertar($empresa){
        $sql = 'INSERT INTO empresa(siglas, nombre, notas) ';
		$sql .= 'VALUES (:siglas, :nombre, :notas)';
		$params = array('siglas' => $empresa->siglas, 'nombre'=>$empresa->nombre, 'notas'=>$empresa->notas);
		BD::insertar($sql, $params);
	}
}