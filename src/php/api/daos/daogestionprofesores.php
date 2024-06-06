<?php
	/**
		DAO de Profesores por clase.
		Objeto para el acceso a los datos relacionados con los profesores.
	**/

class daogestionprofesores{

    public static function verProfesores(){
        $sql = "SELECT u.id, u.nombre, u.apellidos, u.email ";
        $sql .= "FROM Profesor p ";
        $sql .= "JOIN Usuario u ON u.id = p.id ";

        $params = array();
        return BD::seleccionar($sql, $params);
    }

    public static function eliminarProfesor($id){
        $sql = "DELETE FROM Usuario ";
        $sql .= "WHERE id = :id";

        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);
    }

    public static function insertarProfesor($profesor) {
        try {
            BD::iniciarTransaccion();

            // Insertar en la tabla Usuario
            $sql = "INSERT INTO Usuario (nombre, apellidos, email) VALUES (:nombre, :apellidos, :email)";
            $params = array(
                ':nombre' => $profesor->nombre,
                ':apellidos' => $profesor->apellidos,
                ':email' => $profesor->email
            );
            $usuarioId = BD::ejecutar($sql, $params, true);

            // Comprobar si el ID del usuario es válido
            if (empty($usuarioId)) {
                throw new Exception('El ID del usuario no se obtuvo correctamente.');
            }

            // Insertar en la tabla Profesor
            $sql = "INSERT INTO Profesor (id) VALUES (:id)";
            $params = array(':id' => $usuarioId);
            $resultado = BD::ejecutar($sql, $params);

            if ($resultado === false) {
                throw new Exception('Error al insertar en la tabla Profesor.');
            }

            if (!BD::commit()) {
                throw new Exception('No se pudo confirmar la transacción.');
            }
        } catch (Exception $e) {
            BD::rollback(); // Deshacer la transacción en caso de error
            echo 'Error: ' . $e->getMessage();
        }
    }


    public static function actualizarProfesor($profesor){

        $sql = "UPDATE Usuario ";
        $sql .= "SET nombre = :nombre, apellidos = :apellidos, email = :email ";
        $sql .= "WHERE id = :id";

        $params = array(
            ':nombre' => $profesor->nombre,
            ':apellidos' => $profesor->apellidos,
            ':email' => $profesor->email,
            ':id' => $profesor->id
        );

        BD::ejecutar($sql, $params);

    }

}
