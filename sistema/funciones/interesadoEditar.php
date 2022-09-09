<?php
set_include_path('../../lib/'.PATH_SEPARATOR.'../../conexion/');
//include_once 'seguridadNivel2.php';
include_once 'conexion.php';
include_once 'Sanitize.class.php';
//include_once 'ArrayHash.class.php';

/**********************************************************************************************************************************************************************/
/**************************************************************** RECIBIR PARAMETROS Y SANITIZARLOS *******************************************************************/
/**********************************************************************************************************************************************************************/

$id = ( isset($_POST['id']) )?SanitizeVars::INT($_POST['id']):false;
$apellido = isset($_POST['apellido'])?SanitizeVars::APELLIDONOMBRES($_POST['apellido'],2,50):false;
$nombres = isset($_POST['nombres'])?SanitizeVars::APELLIDONOMBRES($_POST['nombres'],2,50):false;
$dni = isset($_POST['dni'])?SanitizeVars::NUMEROS($_POST['dni'],8,8):false;
$domicilio = isset($_POST['direccion'])?SanitizeVars::DOMICILIO($_POST['direccion'],50):false;
$telefono = isset($_POST['telefono'])?SanitizeVars::STRING($_POST['telefono'],6,15):false;
$email = isset($_POST['email'])?SanitizeVars::EMAIL($_POST['email']):false;
$localidad = isset($_POST['localidad_id'])?SanitizeVars::INT($_POST['localidad_id']):false;


//die($_POST['dni'].'-'.$id.'-'.$apellido.'-'.$nombres.'-'.$dni.'-'.$domicilio.'-'.$telefono.'-'.$email.'-'.$localidad);

/**********************************************************************************************************************************************************************/
/**********************************************************************************************************************************************************************/
/**********************************************************************************************************************************************************************/

$array_resultados = array();
if ($id && $apellido && $nombres && $dni && $domicilio && $telefono && $email && $localidad) {
      $entidad = "Cliente";
      /** SE INICIA LA TRANSACCION **/
      db_start_trans($conex);     
      $sqlActualiza = "UPDATE cliente 
                       SET apellido = '$apellido', nombres = '$nombres', dni = '$dni', direccion = '$domicilio', 
                           telefono = '$telefono', email = '$email', localidad_id = $localidad 
                       WHERE id = $id";
      
      //die($sqlActualiza);    

      $ok = @mysqli_query($conex,$sqlActualiza);
     
      //PRENGUNTAMOS SI HUBO ERROR
      if(!$ok){
            db_rollback($conex);
            $array_resultados['codigo'] = 11;
            $array_resultados['mensaje'] = "El ".$entidad." no pudo ser actualizado."; 
      } else {
            db_commit($conex);
            $array_resultados['codigo'] = 100;
            $array_resultados['mensaje'] = "El ".$entidad." fue actualizado exitosamente.";
      };
} else {
      $array_resultados['codigo'] = 10;
      $array_resultados['mensaje'] = "Debe completar todos los datos.";
}

echo json_encode($array_resultados);



?>
