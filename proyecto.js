var restify = require('restify'); //web server restify
var builder = require('botbuilder');

//Crear servidor
var server = restify.createServer();

//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port || 
    process.env.PORT || 
    3978, function(){
        console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

// Diálogos
bot.dialog('/',[  // Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session,result,next){
        if(!session.userData.nombre){// preguntar si sabemos el nombre
        builder.Prompts.text(session, '¿Cómo te llamas?');
    }
    else{
        next();//Pasamos al siguiente metodo de la cascada llamada next()
    }
    
    },
    function(session,results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`hola ${session.userData.nombre}!` );
        session.beginDialog('/preguntarLugar');
  

    },
    function (session) {
        
        if (session.dialogData.lugar) {
        
        session.send(`Saludos por ${session.userData.lugar}`);
        
        }
        
        else {
        
        session.send('Ya no me acuerdo donde estás.');
        
        }
        
        }
        
        ]);
        
        
        
        bot.dialog('/preguntarLugar', [
        
        function (session) {
        
        builder.Prompts.text(session, '¿Dónde estás?');
        
        },
        
        function (session, results) {
        
        session.dialogData.lugar = results.response;
        
        
        
        session.endDialog(`Saludos por ${session.dialogData.lugar} (me acuerdo en este diálogo!)`);
        session.beginDialog('/preguntarComida');
        }
        
        ]);
        bot.dialog('/preguntarComida', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu pais favorito?');
            },
            function (session, results){
                let pais = results.response;
                session.endConversation(`${pais} también es mi pais favorito`);
                session.beginDialog('/preguntarAños');
            }
        ]);
        bot.dialog('/preguntarAños', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuántos hermanos tienes?');
            },
            function (session, results){
                let hermanos = results.response;
                session.endConversation(`uyyy ${hermanos} que bien te felicito`);
                session.beginDialog('/preguntarDeporte');
            }
        ]);
        bot.dialog('/preguntarDeporte', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu deporte favorito?');
            },
            function (session, results){
                let deporte = results.response;
                session.endConversation(` el ${deporte}?, uno de los mejores deportes`);
                session.beginDialog('/preguntarEquipofavorito');
            }
        ]);
        
        bot.dialog('/preguntarEquipofavorito', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu color favorito?');
            },
            function (session, results){
                let color = results.response;
                session.endConversation(` el ${color}?, que color tan bonito`);
                session.beginDialog('/preguntardondeestudias');
            }
        
        ]);
        bot.dialog('/preguntardondeestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que barrio vives?');
            },
            function (session, results){
                let barrio = results.response;
                session.endConversation(` en ${barrio} barrio amañador`);
                session.beginDialog('/preguntarqueestudias');
            }
        
        ]);
        bot.dialog('/preguntarqueestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que trabajas?');
            },
            function (session, results){
                let trabajo = results.response;
                session.endConversation(` muy bueno  ${trabajo} te felicito`);
                session.beginDialog('/preguntarsemestre');
            }
        
        ]);
        bot.dialog('/preguntarsemestre', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿y que funcion desempeñas en tu trabajo?');
            },
            function (session, results){
                let desempenas = results.response;
                session.endConversation(`  ${desempenas} que bueno`);
                session.beginDialog('/preguntarmusicafavorita');
            }
        
        ]);
        bot.dialog('/preguntarmusicafavorita', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿que genero de musica te gusta bailar?');
            },
            function (session, results){
                let musica = results.response;
                session.endDialog(`${musica} que interesante musica`);
                session.beginDialog('/preguntartegustaviajar');
            }
        
        ]);
        bot.dialog('/preguntartegustaviajar', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿te gusta los pasteles?');
            },
            function (session, results){
                let pasteles = results.response;
             
                if(pasteles == 'si' || pasteles == 'SI'){
                    session.endConversation(`${pasteles} muy bien por ti`);
                    session.beginDialog('/adondehasviajado');
                }else{
                    session.endConversation(`${pasteles} que lastima `);
                    
                }
            }
        ]);
        bot.dialog('/adondehasviajado', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿a que cuidades de colombia haz viajado?');
            },
            function (session, results){
                let viaje = results.response;
                session.endConversation(`${viaje} excelente a mi tambien me encanta `);
                session.beginDialog('/preguntarEstadocivil');
            }
        
        ]);
        bot.dialog('/preguntarEstadocivil', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu estado civil?');
            },
            function (session, results){
                let estado = results.response;
        
                if(estado == 'casado' || estado == 'CASADO'){
                    session.endDialogWithResult(`${estado} Estás jodido hermano`);
                }else{
                    session.endConversation(` ${estado} que bien por ti`);
                }
                
            }
        ]);