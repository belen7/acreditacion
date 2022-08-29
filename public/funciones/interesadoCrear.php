<?php
set_include_path('../../lib/'.PATH_SEPARATOR.'../../conexion/');
//include_once 'seguridadNivel2.php';
include_once 'conexion.php';
include_once 'Sanitize.class.php';
include_once 'pagination.php';
require_once 'phpqrcode/qrlib.php';
//include_once 'ArrayHash.class.php';

function enviarEmail($arr) {
      $valorParametro = base64_encode($arr['dni']);
      $url = "https://escuela40.net/acreditacion/sistema/buscarPorQr.php?q=" . $valorParametro;
      //$url = "http://127.0.0.1/proyecto/acreditacion/sistema/buscarPorQr.php?q=" . $valorParametro;
      $nombreArchivo = "../../qr/qrInteresado".$arr['dni'].".png";
      QRCode::png($url, $nombreArchivo, 'QR_ECLEVEL_Q', 5, 1);
      $para = $arr['email'];
      $titulo = 'Escuela 40 Mariano Moreno - Registro Exitoso';

      $mensaje = '<html>'.
            '<head><title>Email con HTML</title></head>'.
            '<body><h1>Datos de la Persona que Asistira a las Jornadas</h1>'.
            'Por favor no elimine éste email'.
            '<hr>'.
            'Enviado por mi programa en PHP'.
            '<table>'.
            '<tr><th align="left">Apellido</th><td>'.$arr['apellido'].'</td></tr>'.
            '<tr><th align="left">Nombres</th><td>'.$arr['nombres'].'</td></tr>'.
            '<tr><th align="left">DNI</th><td>'.$arr['dni'].'</td></tr>'.
            '<tr><th align="left">Domiclio</th><td>'.$arr['domicilio'].'</td></tr>'.
            '<tr><th align="left">Telefono</th><td>'.$arr['telefono'].'</td></tr>'.
            '<tr><th colspan="2" align="center"><img src="https://escuela40.net/acreditacion/qr/qrInteresado'.$arr['dni'].'.png" width="200"></td></tr>'.
            '</table>'.
            '</body>'.
            '</html>';
      $cabeceras = 'MIME-Version: 1.0' . "\r\n";
      $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
      $cabeceras .= 'From: noreply@escuela40.net';
      mail($para, $titulo, $mensaje, $cabeceras);

    
};

/**********************************************************************************************************************************************************************/
/**************************************************************** RECIBIR PARAMETROS Y SANITIZARLOS *******************************************************************/
/**********************************************************************************************************************************************************************/

$apellido = isset($_POST['apellido'])?SanitizeVars::APELLIDONOMBRES($_POST['apellido'],2,50):false;
$nombres = isset($_POST['nombres'])?SanitizeVars::APELLIDONOMBRES($_POST['nombres'],2,50):false;
$dni = isset($_POST['dni'])?SanitizeVars::NUMEROS($_POST['dni'],8,8):false;
$domicilio = isset($_POST['domicilio'])?SanitizeVars::DOMICILIO($_POST['domicilio'],50):false;
$telefono = isset($_POST['telefono'])?SanitizeVars::STRING($_POST['telefono'],6,15):false;
$email = isset($_POST['email'])?SanitizeVars::EMAIL($_POST['email']):false;
$localidad = isset($_POST['localidad'])?SanitizeVars::INT($_POST['localidad']):false;
$foto = isset($_POST['foto']) && ($_POST['foto']<>'')?$_POST['foto']:false;

/**********************************************************************************************************************************************************************/
/**********************************************************************************************************************************************************************/
/**********************************************************************************************************************************************************************/
$entidad = "Interesado";
$array_resultados = array();
if ($apellido && $nombres && $dni && $domicilio && $domicilio) {
      $msg = "";
      $password_por_defecto = md5('12345678');
      /** SE INICIA LA TRANSACCION **/
      db_start_trans($conex);     
      $sqlInserta = "INSERT INTO  `interesado` (apellido, nombres, dni, direccion, telefono, email, localidad_id, foto ) values
                                            ('$apellido', '$nombres', '$dni', '$domicilio','$telefono','$email','$localidad', '$foto')";
      //die($sqlInserta);
      $ok = @mysqli_query($conex,$sqlInserta);

      
      
      //PRENGUNTAMOS SI HUBO ERROR
      if(!$ok){
            db_rollback($conex);
            $msg = "El ".$entidad." no pudo ser creado.";
            $array_resultados['codigo'] = 10;
            $array_resultados['mensaje'] = $msg; 
      } else {
            db_commit($conex);
            $id_interesado = mysqli_insert_id($conex);
            $arreglo_datos = array();
            $arreglo_datos['apellido'] = $apellido;
            $arreglo_datos['nombres'] = $nombres;
            $arreglo_datos['dni'] = $dni;
            $arreglo_datos['domicilio'] = $domicilio;
            $arreglo_datos['telefono'] = $telefono;
            $arreglo_datos['email'] = $email;
            enviarEmail($arreglo_datos);
            $msg = "El ".$entidad." fue creado exitosamente. Revise su correo electronico.";
            $array_resultados['codigo'] = 100;
            $array_resultados['mensaje'] = $msg;
      };
} else {
      $array_resultados['codigo'] = 10;
      $array_resultados['mensaje'] = "Debe completar todos los datos.";
}

echo json_encode($array_resultados);



?>
