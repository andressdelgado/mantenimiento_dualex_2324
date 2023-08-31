<?php
  /**
    DAO General 
    Objeto para el acceso a los datos de una tabla.
  **/

class DAOGeneral{
  /**
    Devuelve un array de datos de una tabla.
	@param $entidad {String} Nombre de la tabla.
    @return Un array de arrays con los datos de la tabla.
  **/
  public static function ver($tabla){
    $sql  = "SELECT * FROM $tabla";
    
	$params = array();

    return BD::seleccionar($sql, $params);
  }
}
