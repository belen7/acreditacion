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
    load(1);
});
  
//****************************************** */
// CARGA EL LISTADO DE TODOS LAS ENTIDADES   */
//****************************************** */
function load(page) {
        /*let id = $("#inputFiltroId").val();
        let usuario = $("#inputFiltroUsuario").val();
        let rol = $("#inputFiltroRol").val();
        let email = $("#inputFiltroEmail").val();
        let busqueda = $("#inputBusquedaRapida").val();*/
        let per_page = 10;
        //let parametros = {"action": "listar","page": page,"per_page": per_page, "id":id, "usuario":usuario, "rol":rol, "email":email,"busqueda_rapida":busqueda};
        let parametros = {"action": "listar","page": page,"per_page": per_page};
       
        let titulo = "<h1><i><u>Interesados</u></i></h1>";
        let breadcrumb = `<nav aria-label="breadcrumb" role="navigation">
                              <ol class="breadcrumb">
                                  <li class="breadcrumb-item" aria-current="page"><a href="home.php">Home</a></li>
                                  <li class="breadcrumb-item active" aria-current="page">`+entidad_titulo2+`</li>
                              </ol>
                          </nav>`;
  
        $("#titulo").html(titulo);
        $("#breadcrumb").html(breadcrumb);
        $.ajax({
            url: 'funciones/'+entidad_nombre+'Listar.php',
            data: parametros,
            method: 'POST',
            beforeSend: function () {
              $("#resultado").html("<img src='../assets/img/load_icon.gif' width='50' >");  
            },
            success: function (data) {
                $("#resultado").slideDown("slow").html(data);
            }
        });
};
  

//************************************************************************************************ */
//************************************************************************************************ */
//************************************* GESTION DE  FILTROS  ************************************* */
//************************************************************************************************ */
//************************************************************************************************ */  

//********************************************* */
// APLICA EL FILTRO AL LISTADO DE ENTIDADES     */
//********************************************* */
  function aplicarFiltro() {
    let id = $("#inputFiltroId").val();
    let apellido = $("#inputFiltroApellido").val();
    let nombres = $("#inputFiltroNombres").val();
    let dni = $("#inputFiltroDni").val();
    let domicilio = $("#inputFiltroDomicilio").val();
    let telefono = $("#inputFiltroTelefono").val();
    let email = $("#inputFiltroEmail").val();
    let localidad = $("#inputFiltroLocalidad").val();
    let provincia = $("#inputFiltroProvincia").val();
    let busqueda = $("#inputBusquedaRapida").val();
    let per_page = 10;
    let parametros = {"action": "listar","page": 1,"per_page": per_page, "id":id, "apellido":apellido, "nombres":nombres, "dni":dni, "domicilio":domicilio, "telefono":telefono, "email":email,"localidad":localidad, "provincia":provincia,"busqueda_rapida":busqueda};
    let titulo = "<h1><i><u>"+entidad_titulo1+"</u></i></h1>";
    //console.info(parametros);
        $("#titulo").html(titulo);
        $.ajax({
            url: 'funciones/'+entidad_nombre+'Listar.php',
            data: parametros,
            method: 'POST',
            success: function (data) {
                $("#resultado").slideDown("slow").html(data);
            }
        });
  };
  
  //******************************************* */
  // APLICA EL FILTRO AL LISTADO DE ENTIDADES   */
  //******************************************* */
  function aplicarBusquedaRapida() {
        let id = $("#inputFiltroId").val();
        let apellido = $("#inputFiltroApellido").val();
        let nombres = $("#inputFiltroNombres").val();
        let dni = $("#inputFiltroDni").val();
        let domicilio = $("#inputFiltroDomicilio").val();
        let telefono = $("#inputFiltroTelefono").val();
        let email = $("#inputFiltroEmail").val();
        let localidad = $("#inputFiltroLocalidad").val();
        let provincia = $("#inputFiltroProvincia").val();
        let busqueda = $("#inputBusquedaRapida").val();
        let per_page = 10;
        let parametros = {"action": "listar","page": 1,"per_page": per_page, "id":id, "apellido":apellido, "nombres":nombres, "dni":dni, "domicilio":domicilio, "telefono":telefono, "email":email,"localidad":localidad, "provincia":provincia,"busqueda_rapida":busqueda};
        //console.info(parametros);
        let titulo = "<h1><i><u>"+entidad_titulo1+"</u></i></h1>";
        $("#titulo").html(titulo);
        $.ajax({
            url: 'funciones/'+entidad_nombre+'Listar.php',
            data: parametros,
            method: 'POST',
            success: function (data) {
                $("#resultado").slideDown("slow").html(data);
            }
        });
  };
  
  //******************************************* */
  // QUITA EL FILTRO DEL LISTADO DE ENTIDADES   */
  //******************************************* */
  function quitarFiltro() {
        $("#inputBusquedaRapida").val(""); 
        $("#inputFiltroId").val(""); 
        $("#inputFiltroUsuario").val("");
        $("#inputFiltroRol").val("");
        $("#inputFiltroEmail").val("");
        load(1);  
  };
  
  
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
                                  <li class="breadcrumb-item" aria-current="page"><a href="home.php">Home</a></li>
                                  <li class="breadcrumb-item" aria-current="page"><a href="#" onclick="load(1)">`+entidad_titulo2+`</></a></li>
                                  <li class="breadcrumb-item active" aria-current="page">Nuevo</li>
                              </ol>
                          </nav>`;
      $("#breadcrumb").slideDown("slow").html(breadcrumb);                    
      
      $.get(url,function(data) {
            $("#resultado").slideDown("slow").html(data);
            $('#inputAltaLocalidad').select2({
                    theme: "bootstrap",
                    placeholder: "Buscar",
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
    
    let parametros = {"apellido":apellido,"nombres":nombres,"dni":dni,"domicilio":domicilio,"telefono":telefono,"email":email,"localidad":localidad,"foto":foto};
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
                load(1);
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


//************************************************************************************************ */
//************************************************************************************************ */
//************************************* EDICION DE LA ENTIDAD ************************************ */
//************************************************************************************************ */
//************************************************************************************************ */

//************************************************* */
// NOS PERMITE EDITAR UNA ENTIDAD                   */
//************************************************* */
function entidadEditar(entidad_id){
      let datos_entidad = "";
      let url = "html/"+entidad_nombre+"Editar.html";
      let url_obtener_entidad = "funciones/localidadObtener.php";
      let breadcrumb = `<nav aria-label="breadcrumb" role="navigation">
                              <ol class="breadcrumb">
                                  <li class="breadcrumb-item" aria-current="page"><a href="home.php">Home</a></li>
                                  <li class="breadcrumb-item" aria-current="page"><a href="#" onclick="load(1)">`+entidad_titulo2+`</></a></li>
                                  <li class="breadcrumb-item active" aria-current="page">Editar</li>
                              </ol>
                          </nav>`;
      $("#breadcrumb").slideDown("slow").html(breadcrumb);   
      datos_entidad = entidadObtenerPorId(entidad_id);
      //console.log(datos_entidad)
      $.get(url,function(data) {
            $("#resultado").slideDown("slow").html(data);
            /******************************************************************** */
            /**************************** CAMBIAR ******************************* */
            $("#inputId").val(datos_entidad.datos[0].id);
            $("#inputApellido").val(datos_entidad.datos[0].apellido);
            $("#inputNombre").val(datos_entidad.datos[0].nombres);
            $("#inputDocumento").val(datos_entidad.datos[0].dni);
            $("#inputDomicilio").val(datos_entidad.datos[0].direccion);
            $("#inputTelefono").val(datos_entidad.datos[0].telefono);
            $("#inputEmail").val(datos_entidad.datos[0].email);
            //$("#inputLocalidad").val();
            
            $('#inputLocalidad').select2({
                theme: "bootstrap",
                placeholder: "Localidad",
                ajax: {
                    url: url_obtener_entidad,
                    dataType: 'json',
                    delay: 250,
                    data: function (datos) {
                        return {
                            searchTerm: datos.term // search term
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
            //alert(datos_entidad.datos[0].localidad_id);
           // $('#inputLocalidad').find("option[value='" + datos_entidad.datos[0].localidad_id + "']")
            //$('#inputLocalidad').val(datos_entidad.datos[0].localidad_id); // Select the option with a value of '1'
            //$('#inputLocalidad').trigger('change'); // Notify any JS components that the value changed
            var data = {
                id: datos_entidad.datos[0].localidad_id,
                text: datos_entidad.datos[0].localidad_nombre + ' (Pcia. ' + datos_entidad.datos[0].provincia_nombre + ')'
            };
            
            var newOption = new Option(data.text, data.id, false, false);
            $('#inputLocalidad').append(newOption).trigger('change');
            //$("#inputLocalidad option[value="+ datos_entidad.datos[0].localidad_id +"]").attr("selected",true);
            
             /******************************************************************** */
             /******************************************************************** */
      });
}
  
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/  
//************************************************** */
// NOS PERMITE BUSCAR UNA ENTIDAD POR ID ALUMNO      */
//************************************************** */
function entidadObtenerPorId(entidad_id){
    let url = "funciones/"+entidad_nombre+"ObtenerPorId.php";
    let resultado;
    
    $.ajaxSetup({
        async: false
      });
    $.post(url, {"id":entidad_id}, function (data) {
          resultado = data;
    },"json")
    
    return resultado;
}


//************************************************* */
// GRABA LA ENTIDAD NUEVO EN LA BASE DE DATOS       */
//************************************************* */
function entidadGuardarEditado(){
    let id = $("#inputId").val();
    let apellido = $("#inputApellido").val();
    let nombres = $("#inputNombre").val();
    let dni = $("#inputDocumento").val();
    let domicilio = $("#inputDomicilio").val();
    let telefono = $("#inputTelefono").val();
    let email = $("#inputEmail").val();
    let localidad = $("#inputLocalidad").val();
    
    let parametros = {"id":id,"apellido":apellido,"nombres":nombres,"dni":dni,"domicilio":domicilio,"telefono":telefono,"email":email,"localidad":localidad};
    //console.info(parametros);
    let url = "funciones/"+entidad_nombre+"Editar.php";
    if (id!="" && apellido!="" && nombres!=="" && dni!="" && domicilio!="" && telefono!="" && email!="" && localidad!="") {
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
            load(1);
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
    }    
}

//************************************************************************************************ */
//************************************************************************************************ */
//************************************* ELIMINACION DEL ALUMNO   ********************************* */
//************************************************************************************************ */
//************************************************************************************************ */

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
//***************************************************************** */
// MANEJA LA SELECCION / DESELECCION DE TODOS LOS CHECKBOX          */
//***************************************************************** */
$("body").on("click","#seleccionar_todos", function() {
    if( $(this).is(':checked') ){
          // Hacer algo si el checkbox ha sido seleccionado
          $('.check').prop('checked',true);
      } else {
          // Hacer algo si el checkbox ha sido deseleccionado
          $('.check').prop('checked',false);
      }
  });
  
  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
  //******************************************************************************************** */
  // VERFICICA SI HAY ENTIDADES SELECCIONADOS/CHECKBOX Y PIDE CONFIRMACION PARA SU ELIMINACION   */
  //******************************************************************************************** */
  function entidadEliminarSeleccionados(){
      let arreglo="";
      let cantidad_seleccionados = 0;
      $('.check:checked').each(
                  function() {
                      arreglo += ','+$(this).val();
                      cantidad_seleccionados++;
                  }
      );
      if (cantidad_seleccionados>0) {
              $("#confirmarEliminarTodosModal").modal("show");
      } else {
              $("#sinElementosModal").modal("show");
              $("#resultado_accion").html(`
                                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-warning">
                                              <span style="color: #000000;">
                                              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                                  &nbsp;<strong>Atenci&oacute;n:</strong> No hay `+entidad_titulo2+` seleccionados.
                                                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                  </button>   
                                              </span>    
                                          </div>
              `);
      };
  }
  

  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
  //*************************************************************************** */
  // ELIMINA TODOS LAS ENTIDADES CUYOS CHECKBOX ESTAN SELECCIONADOS             */
  //*************************************************************************** */
  function entidadEliminarSeleccionadosConfirmar(){
      let arreglo="";
      let parametros = "";
      let url = "funciones/"+entidad_nombre+"Eliminar.php";
      let cantidad_seleccionados = 0;
      $('.check:checked').each(
                  function() {
                      arreglo += ','+$(this).val();
                  }
      );
      arreglo = arreglo.substr(1,arreglo.length-1);
      parametros = {"id":arreglo};
      $.post(url, parametros, function (data) {
              $("#resultado_accion").html(`
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-success">
                          <span style="color: #000000;">
                          <i class="fa fa-info-circle" aria-hidden="true"></i>
                              <strong>Atenci??n:</strong>&nbsp;`+data.mensaje+`
                          </span>
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                          </button>       
                      </div>
              `);
              load(1);
      },"json");
  };
  
  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
  //******************************************************* */
  // CONFIRMA LA ELIMINACION DE LA ENTIDAD DESDE EL MODAL   */
  //******************************************************* */
  $('#confirmarModal').on('shown.bs.modal', function (e) {
       let button = $(e.relatedTarget); // BUTTON QUE DISPARO EL MODAL
       let id=button.data("id");
      $("#inputEliminarId").val(id);
  })
  
  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
  //************************************************ */
  // NOS PERMITE ELIMINAR UNA ENTIDAD ESPECIFICA     */
  //************************************************ */
  function entidadEliminarSeleccionado(entidad_id){
        let arreglo="";
        let parametros = "";
        let url = "funciones/"+entidad_nombre+"Eliminar.php";
        parametros = {"id":entidad_id};
                $.post(url, parametros, function (data) {
                        $("#resultado_accion").html(`
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-success">
                                      <span style="color: #000000;">
                                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                                          <strong>Atenci??n:</strong>&nbsp;`+data.mensaje+`
                                      </span>
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                      </button>       
                                </div>
                        `);
                        load(1);
                },"json");
  }