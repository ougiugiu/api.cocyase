### DOCUMENTACIÓN DE API ###

    ### CONFIGURACIÓN ###
    Para configurar la API basta con modificar los valores de cada campo en 
    el archivo 'variables.env'

        TOKEN (Token del bot proporcionado por Telegram)
        WH_URL (URL de la API, o sea, el dominio donde está alojada NOTA** No debe terminar en '/')
        ORIGIN_URL (URL de la página clon NOTA** No debe terminar en '/')
        CHAT_ID (ID CHAT a donde llegarán los mensajes)

    NOTA** Cada dato debe estar entre las comillas.



    ### INSTALACIÓN / CAMBIO DE SERVIDOR O HOST ###
    Para instalar la API en cada caso es singular y depende del host
    contratado, generalmente existen apartados y guías en cada uno.
    Es importante saber que éste proyecto corre en la tecnología NodeJS.

    También es posible ejecutar ésta API desde un servidor local (Tu propio PC).
    Para ello es necesario instalar una aplicación que haga de intermediario como
    'ngrok' (Revisar documentación propia para poner en marcha). Es importante 
    que sepa que éste servicio puede correr desde su propio PC ya que se puede ahorrar
    un host propio para la API.

    Existen servicio gratuitos para alojar APIs de éste tipo, puedes echar un vistazo
    a https://clever-cloud.com.


    NOTA** El alojamiento de la API en principio corre por cuenta del desarrollador.
    En caso de querer independencia total puedes hacer fácilmente un deployment
    desde el host que desee, y, para dejar obsoleta la anterior API basta con cambiar
    la URL en las opciones de la página clon.

    Enjoy!