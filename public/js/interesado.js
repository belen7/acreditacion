//************************************************************************************************ */
//************************************************************************************************ */
//*********************************** LISTADO DE ENTIDADES *************************************** */
//************************************************************************************************ */
//************************************************************************************************ */
let entidad_nombre = "interesado";
let entidad_titulo1 = "INTERESADOS";
let entidad_titulo2 = "Interesados";
let campo1 = "Id";
let campo2 = "Usuario";
let campo3 = "Rol";
let campo4 = "Email";

$(function () {
    entidadCrear();
});
  
//************************************************************************************************ */
//************************************************************************************************ */
//*********************************** CREACION DE UNA ENTIDAD ************************************ */
//************************************************************************************************ */
//************************************************************************************************ */

//************************************************ */
// NOS PERMITE CREAR UNA ENTIDAD                   */
//************************************************ */
function entidadCrear(){
      let arreglo="";
      let parametros = "";
      let url = "html/"+entidad_nombre+"Crear.html";
      let url_select2_obtener = "funciones/localidadObtener.php";// Esto puede cambiar
      let breadcrumb = `<nav aria-label="breadcrumb" role="navigation">
                              <ol class="breadcrumb">
                                  <li class="breadcrumb-item" aria-current="page"><a href="../index.php">Home</a></li>
                                  <li class="breadcrumb-item active" aria-current="page">Registrarme</li>
                              </ol>
                          </nav>`;
      $("#breadcrumb").slideDown("slow").html(breadcrumb);                    
      
      $.get(url,function(data) {
            $("#resultado").slideDown("slow").html(data);
            $("#inputAltaFechaNacimniento").datepicker({
                dateFormat: 'dd/mm/yy',
                //startDate: '-3d'
            });
            $('#inputAltaLocalidad').select2({
                    theme: "bootstrap",
                    placeholder: "Buscar Localidad",
                    ajax: {
                        url: url_select2_obtener,
                        dataType: 'json',
                        delay: 250,
                        data: function (data) {
                            return {
                                searchTerm: data.term // search term
                            };
                        },
                        processResults: function (response) {
                            return {
                                results:response
                            };
                        },
                        cache: true
                    }
            });

      });
}
  
//************************************************* */
// GRABA LA ENTIDAD NUEVO EN LA BASE DE DATOS       */
//************************************************* */
  function entidadGuardarNuevo(){
    let apellido = $("#inputAltaApellido").val();
    let nombres = $("#inputAltaNombre").val();
    let dni = $("#inputAltaDocumento").val();
    let domicilio = $("#inputAltaDomicilio").val();
    let telefono = $("#inputAltaTelefono").val();
    let email = $("#inputAltaEmail").val();
    let localidad = $("#inputAltaLocalidad").val();
    let foto = $("#inputAltaNombreFoto").val();
    let fecha_nacimiento = $("#inputAltaFechaNacimniento").val();
    
    let parametros = {"apellido":apellido,"nombres":nombres,"dni":dni,"domicilio":domicilio,"telefono":telefono,"email":email,"localidad":localidad,"foto":foto,"fecha_nacimiento":fecha_nacimiento};
    //console.info(parametros);
    
    let url = "funciones/"+entidad_nombre+"Crear.php";
    if (apellido!="" && nombres!=="" && dni!="" && domicilio!="" && telefono!="" && email!="" && localidad!="") {
            $.post(url,parametros, function(data) {
                if (data.codigo==100) {
                        $("#resultado_accion").html(`
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-success">
                                                    <span style="color: #000000;">
                                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                                        &nbsp;<strong>Atenci&oacute;n:</strong> `+data.mensaje+`
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>   
                                                    </span>    
                                                </div>`);
                } else {
                        $("#resultado_accion").html(`
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-danger">
                                                    <span style="color: #000000;">
                                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                                        &nbsp;<strong>Atenci&oacute;n:</strong> `+data.mensaje+`
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>   
                                                    </span>    
                                                </div>`);
                }
            },"json"); 
    } else {
        $("#resultado_accion").html(`
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-danger">
            <span style="color: #000000;">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                &nbsp;<strong>Atenci&oacute;n:</strong> Debe completar todos los datos.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>   
            </span>    
        </div>`);
    };
}


