/*
Explicaciones!!
span class="trn" data-trn-key="step5"
(si solo tiene el trn va el texto a traduicir entre comillas, sino es el data-trn-key y va sin comillas)
o solo class="trn"
Ejemplo:
var t = {
  "Toggle navigation": {
    pt: "Mostrar/esconder navegaÃ§Ã£o"
  },
  "Home": {
    pt: "InÃ­cio"
  },
  About: {
    pt: "Acerca"
  }
}
var _t = $('body').translate({lang: "en", t: t});
var str = _t.g("translate");
console.log(str);


$(".lang_selector").click(function(ev) {
  var lang = $(this).attr("data-value");
  _t.lang(lang);

  console.log(lang);
  ev.preventDefault();
});
// Comienza con la funcion!!

es // español
en // ingles
pt // portugues
zh// chino
*/


$(function() {

  window.t = {
    // Inicio del LOGIN
    "¿Pensás que sabés de Fútbol?": {
      es: "¿Pensás que sabés de Fútbol?",
      en: "Do you think you know about Football?",
      pt: "Você acha que conhece o futebol?",
      zh: "你认为你知道足球吗？"
    },
    "Demostrálo": {
      es: "Demostrálo",
      en: "Prove it",
      pt: "Prove it",
      zh: "证明"
    },
    "Ingresa con Facebook": {
      es: "Ingresa con Facebook",
      en: "Sign in with Facebook",
      pt: "Faça login com o Facebook",
      zh: "用Facebook登录"
    },
    "Totalmente Gratis": {
      es: "Totalmente Gratis",
      en: "Totally free",
      pt: "Totalmente grátis",
      zh: "完全免费"
    },
    "Iniciar sesión": {
      es: "Iniciar sesión",
      en: "Log in",
      pt: "Iniciar sessão",
      zh: "注册"
    },
    "¿Olvido su contraseña?": {
      es: "¿Olvido su contraseña?",
      en: "Forgot your password?",
      pt: "Esqueceu sua senha?",
      zh: "忘记密码？"
    },
    "Recordar": {
      es: "Recordar",
      en: "Remember",
      pt: "Para lembrar",
      zh: "要记住"
    },
    "Correo electrónico": {
      es: "Correo electrónico",
      en: "Email",
      pt: "Correio eletrônico",
      zh: "电子邮件"
    },
    "o usá tu correo electrónico": {
      es: "o usá tu correo electrónico",
      en: "or use your email",
      pt: "ou use seu e-mail",
      zh: "-"
    },
    pass: {
      es: "Contraseña",
      en: "Password",
      pt: "Senha",
      zh: "密码"
    },
    email: {
      es: "Correo electrónico",
      en: "Email",
      pt: "Correio eletrônico",
      zh: "电子邮件"
    },
    nick: {
      es: "Apodo",
      en: "Nickname",
      pt: "Apelido",
      zh: "绰号"
    },
    "¿Sabés como jugar?": {
      es: "¿Sabés como jugar?",
      en: "Do you know how to play?",
      pt: "Você sabe como jogar?",
      zh: "你知道怎么玩吗？"
    },
    // En conjunto con el de abajo
    "Elegí los partidos de la fecha": {
      es: "Elegí los partidos de la fecha",
      en: "Choose the games",
      pt: "Escolha os jogos",
      zh: "选择你想参加的游戏"
    },
    "en que queres participar": {
      es: "en que queres participar",
      en: "you want to participate in",
      pt: "nos quais deseja participar",
      zh: " "
    }, // Fin del conjunto
    // En conjunto con el de abajo
    "Y elegí a 3 jugadores": {
      es: "Y elegí a 3 jugadores",
      en: "And chose 3 players ",
      pt: "E escolhi 3 jogadores",
      zh: "我选择了3名球员"
    },
    "para armar tu equipo": {
      es: "para armar tu equipo",
      en: "to build your team",
      pt: "para construir sua equipe",
      zh: "武装你的团队"
    }, // Fin del conjunto
    // En conjunto con el de abajo
    "Compite": {
      es: "Compite",
      en: "Your team of 3 ",
      pt: "Sua equipe de 3 ",
      zh: "您的3场比赛与其他用户的队伍"
    },
    "Tu equipo de 3 vs los equipos de los otros usuarios": {
      es: "Tu equipo de 3 vs los equipos de los otros usuarios",
      en: "competes vs the teams of the other users",
      pt: "compete contra as equipes dos outros usuários",
      zh: "根据他在现场的表现"
    },
    "según su desempeño en el partido real": {
      es: "según su desempeño en el partido real",
      en: "according to their performance in the actual match",
      pt: "de acordo com seu desempenho na partida atual",
      zh: " "
    }, // Fin del conjunto
    "Mira tus resultados en VIVO": {
      es: "Mira tus resultados en VIVO",
      en: "Watch your LIVE results",
      pt: "Assista seus resultados ao VIVO",
      zh: "观看您的实时结果"
    },
    "Ganá y llévate todos los premios": {
      es: "Ganá y llévate todos los premios",
      en: "Win and take all the prizes",
      pt: "Ganhe e tire todos os prêmios",
      zh: "赢取并获得所有奖品"
    },
    "Compite contra otros ususarios por premios y demuestra quien sabe más.": {
      es: "Compite contra otros ususarios por premios y demuestra quien sabe más.",
      en: "Compete against other users for awards and shows who knows more.",
      pt: "Competir contra outros usuários por prêmios e mostrar quem sabe mais.",
      zh: "与其他用户竞争获奖，并显示谁更多。"
    },
    "Todos los partidos tienen premios,<br>queda en vos, si sabes ganas.": {
      es: "Todos los partidos tienen premios,<br>queda en vos, si sabes ganas.",
      en: "All matches have prizes, it's up to you,<br> if you know how to win.",
      pt: "Cada jogo tem prêmios, depende de você,<br> se você sabe como ganhar.",
      zh: "每个游戏都有奖品，这取决于你，如果你知道如何赢。"
    },
    "PROBAR SIN REGISTRO": {
      es: "PROBAR SIN REGISTRO",
      en: "TEST WITHOUT REGISTRATION",
      pt: "TEST SEM INSCRIÇÃO",
      zh: "没有注册的测试"
    },
    "Registrate": {
      es: "Registrate",
      en: "Sign up",
      pt: "Registe-se",
      zh: "注册"
    },
    "Creando una cuenta está aceptando los": {
      es: "Creando una cuenta está aceptando los",
      en: "Creating an account is accepting the",
      pt: "Criar uma conta aceita os",
      zh: "创建帐户是接受"
    },
    "términos y condiciones": {
      es: "términos y condiciones",
      en: "terms and conditions",
      pt: "termos e condições",
      zh: "条款和条件"
    },
    "Error inesperado": {
      es: "Error inesperado",
      en: "Unexpected error",
      pt: "Erro inesperado",
      zh: "意外的错误"
    },
    "Algo salio mal, vuelva a intentar": {
      es: "Algo salio mal, vuelva a intentar",
      en: "Something went wrong, try again",
      pt: "Algo deu errado, tente novamente",
      zh: "出了问题，再试一次"
    },
    "ERROR DE CONEXIÓN": {
      es: "ERROR DE CONEXIÓN",
      en: "CONNECTION ERROR",
      pt: "ERRO DE CONEXÃO",
      zh: "连接错误"
    },
    "Hubo un error de conexión intente nuevamente": {
      es: "Hubo un error de conexión intente nuevamente",
      en: "There was a connection error try again",
      pt: "Ocorreu um erro de conexão tente novamente",
      zh: "发生连接错误再次尝试"
    },
    "Aceptar": {
      es: "Aceptar",
      en: "Accept",
      pt: "Aceitar",
      zh: "接受"
    },
    "Cancelar": {
      es: "Cancelar",
      en: "Cancel",
      pt: "Cancelar",
      zh: "取消"
    },
    "Habilitar las cookies": {
      es: "Habilitar las cookies",
      en: "Enable cookies",
      pt: "Ativar cookies",
      zh: "启用Cookie"
    },
    "Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas": {
      es: "Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas",
      en: "In order to enjoy the Jugaplay experience you need to have your browser cookies enabled",
      pt: "Para aproveitar a experiência Jugaplay, você precisa ativar os cookies do seu navegador",
      zh: "为了享受Jugaplay体验，您需要启用浏览器Cookie"
    },
    "Campos vacíos": {
      es: "Campos vacíos",
      en: "Empty fields",
      pt: "Campos vazios",
      zh: "空字段"
    },
    "Campo vacío": {
      es: "Campo vacío",
      en: "Empty field",
      pt: "Campo vazio",
      zh: "空场"
    },
    "Los campos <b>Correo electrónico, Contraseña y Apodo</b> son obligatorios": {
      es: "Los campos <b>Correo electrónico, Contraseña y Apodo</b> son obligatorios",
      en: "The fields <b> Email, Password and Nickname </b> are required",
      pt: "Os campos <b> Correio eletrônico, Senha e apelido </b> são obrigatórios",
      zh: "必须填写<b>电子邮件，密码和昵称</b>"
    },
    "El Campo <b>Correo electrónico</b> es obligatorio": {
      es: "El Campo <b>Correo electrónico</b> es obligatorio",
      en: "The <b>Email</b> field is required",
      pt: "O campo <b>Correio eletrônico</b> é necessário",
      zh: "需要<b>电子邮件</b>字段"
    },
    "El Campo <b>Contraseña</b> es obligatorio": {
      es: "El Campo <b>Contraseña</b> es obligatorio",
      en: "The <b>Password</b> field is required",
      pt: "O campo <b>Senha</b> é necessário",
      zh: "需要<b>密码</b>字段"
    },
    "El Campo <b>Apodo</b> es obligatorio": {
      es: "El Campo <b>Apodo</b> es obligatorio",
      en: "The <b>Nickname</b> field is required",
      pt: "O campo <b>Apelido</b> é necessário",
      zh: "<b>昵称</ b>字段是必需的"
    },
    "Contraseña muy corta": {
      es: "Contraseña muy corta",
      en: "Very short password",
      pt: "Senha muito curta",
      zh: "密码很短"
    },
    "La <b>contraseña</b> debe tener al menos <b>8</b> caracteres": {
      es: "La <b>contraseña</b> debe tener al menos <b>8</b> caracteres",
      en: "The <b> password </b> must have at least <b>8</b> characters",
      pt: "A <b> senha </b> deve ter pelo menos <b>8</b> caracteres",
      zh: "<b>密码</b>必须至少具有<b>8</b>个字符"
    },
    "Correo electrónico en uso": {
      es: "Correo electrónico en uso",
      en: "Email in use",
      pt: "Correio eletrônico em uso",
      zh: "使用电子邮件"
    },
    "El correo electrónico": {
      es: "El correo electrónico",
      en: "The email",
      pt: "O correio eletrônico",
      zh: "电子邮件"
    },
    "ya esta registrado en JugaPlay": {
      es: "ya esta registrado en JugaPlay",
      en: "is already registered on JugaPlay",
      pt: "já está registrado no JugaPlay",
      zh: "已经在JugaPlay上注册"
    },
    "Recuperar Contraseña": {
      es: "Recuperar contraseña",
      en: "Recover password",
      pt: "Recuperar senha",
      zh: "恢复密码"
    },
    "Recuperar": {
      es: "Recuperar",
      en: "Recover",
      pt: "Recuperar",
      zh: "恢复密码"
    },
    "Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña": {
      es: "Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña",
      en: "Enter your email and we will send you a link to recover your password",
      pt: "Digite seu correio eletrônico e nós lhe enviaremos um link para recuperar sua senha",
      zh: "输入您的电子邮件，我们将发送一个链接来恢复您的密码"
    },
    "Correo electrónico no registrado": {
      es: "Correo electrónico no registrado",
      en: "Unregistered Email",
      pt: "Correio eletrônico não registrado",
      zh: "未注册的电子邮件"
    },
    "Correo electrónico enviado": {
      es: "Correo electrónico enviado",
      en: "Email Sent",
      pt: "Correio eletrônico enviado",
      zh: "发送电子邮件"
    },
    "El correo electrónico que se ingresó no se encuentra registrado en el sitio, revise si lo escribió correctamente.": {
      es: "El correo electrónico que se ingresó no se encuentra registrado en el sitio, revise si lo escribió correctamente.",
      en: "The email you entered is not registered on the site, check if you typed it correctly.",
      pt: "O correio eletrônico que você digitou não está registrado no site, verifique se você digitou corretamente.",
      zh: "您输入的电子邮件未在网站上注册，请检查您是否正确键入"
    },
    "Se le envió un correo electrónico con un enlace para recuperar su contraseña. Si no encuentra el correo electrónico verifique su casilla de correo no deseado.": {
      es: "Se le envió un correo electrónico con un enlace para recuperar su contraseña. Si no encuentra el correo electrónico verifique su casilla de correo no deseado.",
      en: "You have been sent an email with a link to retrieve your password. If you do not find the email check your spam box.",
      pt: "Você recebeu um e-mail com um link para recuperar sua senha. Se você não encontrar o email, verifique sua caixa de spam.",
      zh: "您已发送一封电子邮件，其中包含一个链接以检索您的密码。如果您没有找到电子邮件检查您的垃圾邮件框"
    },
    "Datos Incorrectos": {
      es: "Datos Incorrectos",
      en: "Incorrect data",
      pt: "Dados incorretos",
      zh: "数据不正确"
    },
    "El <b> correo electrónico o contraseña </b> no se han ingresado correctamente, por favor revise ambos": {
      es: "El <b> correo electrónico o contraseña </b> no se han ingresado correctamente, por favor revise ambos",
      en: "The <b> email or password </b> was not entered correctly, please check both",
      pt: "O <b> e-mail ou senha </b> não foi inserido corretamente, verifique os dois",
      zh: "<b>电子邮件或密码</b>未正确输入，请检查两者"
    },
    "Idiomas": {
      es: "Idiomas",
      en: "Languages",
      pt: "Língua",
      zh: "语言"
    },
    "Apodo en uso": {
      es: "Apodo en uso",
      en: "Nickname in use",
      pt: "Apelido em uso",
      zh: "昵称在使用"
    },
    // FIN del LOGIN
    // Inicio del MENU
    "Juego": {
      es: "Juego",
      en: "Game",
      pt: "Juego",
      zh: "-"
    },
    "Liga": {
      es: "Liga",
      en: "League",
      pt: "Liga",
      zh: "-"
    },
    "Historial": {
      es: "Historial",
      en: "Record",
      pt: "História",
      zh: "-"
    },
    "Opciones": {
      es: "Opciones",
      en: "Options",
      pt: "Opções",
      zh: "-"
    },
    "Tienda de Premios": {
      es: "Tienda de Premios",
      en: "Awards Store",
      pt: "Loja de Prêmios",
      zh: "-"
    },
    'Gana <img src="img/icons/coins/chip.svg" width="15px"> ¡invita amigos!': {
      es: 'Gana <img src="img/icons/coins/chip.svg" width="15px"> ¡invita amigos!',
      en: 'Win <img src="img/icons/coins/chip.svg" width="15px"> invite friends',
      pt: 'Ganhe <img src="img/icons/coins/chip.svg" width="15px"> convide amigos',
      zh: ''
    },
    "Muro de Campeones": {
      es: "Muro de Campeones",
      en: "Wall of Champions",
      pt: "Parede de Campeões",
      zh: "-"
    },
    "Ayuda": {
      es: "Ayuda",
      en: "Help",
      pt: "Ajuda",
      zh: "-"
    },
    "Como jugar": {
      es: "Como jugar",
      en: "How to play",
      pt: "como jogar",
      zh: "-"
    },
    "Reglamento": {
      es: "Reglamento",
      en: "Rules",
      pt: "Regulamento",
      zh: "-"
    },
    "Preguntas frecuentes": {
      es: "Preguntas frecuentes",
      en: "Frequent questions",
      pt: "Perguntas frequentes",
      zh: "-"
    },
    "Soporte": {
      es: "Soporte",
      en: "Support",
      pt: "Suporte",
      zh: "-"
    },
    "Privacidad": {
      es: "Privacidad",
      en: "Privacy",
      pt: "Privacidade",
      zh: "-"
    },
    "Mi Perfil": {
      es: "Mi Perfil",
      en: "My profile",
      pt: "Meu perfil",
      zh: "-"
    },// Especial footer
    "Secciones": {
      es: "Secciones",
      en: "Sections",
      pt: "Seções",
      zh: "-"
    },
    "Usuarios": {
      es: "Usuarios",
      en: "Users",
      pt: "Usuários",
      zh: "-"
    },
    // Notificaciones
    "VER +": {
      es: "VER +",
      en: "MORE",
      pt: "VEJA +",
      zh: "-"
    },
    "Premios": {
      es: "Premios",
      en: "Awards",
      pt: "Prêmios",
      zh: "-"
    },
    // Conseguir fichas!!
    "Conseguir Fichas": {
      es: "Conseguir Fichas",
      en: "Get Chips",
      pt: "obter fichas",
      zh: "-"
    },
    'Por cada encuesta te regalamos 10 fichas <br><small>6 Preguntas (aprox)</small><small style="margin-left: 15px;"> Máximo 1 encuesta por día</small>': {
      es: 'Por cada encuesta te regalamos 10 fichas <br><small>6 Preguntas (aprox)</small><small style="margin-left: 15px;"> Máximo 1 encuesta por día</small>',
      en: 'For each survey we give you 10 chips <br><small>6 questions (aprox)</small><small style="margin-left: 15px;"> Maximum 1 survey per day</small>',
      pt: 'Para cada pesquisa, oferecemos 10 fichas <br><small>6 perguntas (aprox)</small><small style="margin-left: 15px;"> Máximo 1 pesquisa por dia</small>',
      zh: "-"
    },
    "Comprar Fichas": {
      es: "Comprar Fichas",
      en: "Buy chips",
      pt: "Comprar Fichas",
      zh: "-"
    },
    "ENCUESTAS": {
      es: "ENCUESTAS",
      en: "SURVEYS",
      pt: "PESQUISAS",
      zh: "-"
    },
    "Gana fichas completando nuestras encuestas.": {
      es: "Gana fichas completando nuestras encuestas.",
      en: "Win chips by completing our surveys.",
      pt: "Ganhe fichas ao completar nossas pesquisas.",
      zh: "-"
    },
    "Nos interesa tu opinión. ¡Tu tiempo vale!": {
      es: "Nos interesa tu opinión. ¡Tu tiempo vale!",
      en: "We are interested in your opinion. Your time is worth!",
      pt: "Estamos interessados na sua opinião. Seu tempo vale a pena!",
      zh: "-"
    },
    "PACK DE FICHAS": {
      es: "PACK DE FICHAS",
      en: "CHIPS PACK",
      pt: "PACOTE DE FICHAS",
      zh: "-"
    },
    "También podés comprar fichas de forma rápida y fácil. Utiliza tu medio de pago seguro favorito: MercadoPago, Paypal, Paysafe Card.": {
      es: "También podés comprar fichas de forma rápida y fácil. Utiliza tu medio de pago seguro favorito: MercadoPago, Paypal, Paysafe Card.",
      en: "You can also buy chips. Use your favorite secure payment method: MercadoPago, Paypal, Cartão Paysafe.",
      pt: "Você também pode comprar fichas de forma rápida e fácil. Use seu método de pagamento seguro favorito: MercadoPago, Paypal, Cartão Paysafe.",
      zh: "-"
    },
    "VIDEO ADS": {
      es: "VIDEO ADS",
      en: "VIDEO ADS",
      pt: "ADS VIDEO",
      zh: "-"
    },
    "Por cada video ad de 60 segundos aprox que mires adquirís una ficha! (Máximo 10 vídeo ads por día)": {
      es: "Por cada video ad de 60 segundos aprox que mires adquirís una ficha! (Máximo 10 vídeo ads por día)",
      en: "For each video ad (60 seconds approx) you look, you acquire a chip! (Maximum 10 video ads per day)",
      pt: "Para cada anúncio de vídeo de 60 segundos, você consegue adquirir um chip! (Máximo 10 anúncios de vídeo por dia)",
      zh: "-"
    },
    "Completar encuesta": {
      es: "Completar encuesta",
      en: "Complete survey",
      pt: "Completar pesquisa",
      zh: "-"
    },
    "Ver vídeo": {
      es: "Ver vídeo",
      en: "Watch video",
      pt: "Ver vídeo",
      zh: "-"
    },
    // Pagos efectivo
    "COMPRAR FICHAS": {
      es: "COMPRAR FICHAS",
      en: "BUY CHIPS",
      pt: "COMPRAR FICHAS",
      zh: "-"
    },
    "Ya se encuentran acreditadas tus fichas. Ahora tienes:": {
      es: "Ya se encuentran acreditadas tus fichas. Ahora tienes:",
      en: "Your chips are already accredited. Now you have:",
      pt: "Suas fichas já estão credenciadas. Agora você tem:",
      zh: "-"
    },
    "Elige tu pack": {
      es: "Elige tu pack",
      en: "Choose your pack",
      pt: "Escolha o seu pacote",
      zh: "-"
    },
    "Elige tu país": {
      es: "Elige tu país",
      en: "Choose your country",
      pt: "Escolha o seu país",
      zh: "-"
    },
    "Elegir país": {
      es: "Elegir país",
      en: "Choose country",
      pt: "Escolha país",
      zh: "-"
    },
    "Elige el método de pago": {
      es: "Elige el método de pago",
      en: "Choose the payment method",
      pt: "Escolha o método de pagamento",
      zh: "-"
    },
    "Continuar": {
      es: "Continuar",
      en: "Continue",
      pt: "Continuar",
      zh: "-"
    },
    "Se abrirá una ventana nueva para completar el pago de forma segura.": {
      es: "Se abrirá una ventana nueva para completar el pago de forma segura.",
      en: "A new window will open to complete the payment securely.",
      pt: "Uma nova janela será aberta para completar o pagamento com segurança.",
      zh: "-"
    },
    "Acepto los": {
      es: "Acepto los",
      en: "I accept the",
      pt: "Eu aceito os",
      zh: "-"
    },
    "¡Comprar!": {
      es: "¡Comprar!",
      en: "Buy!",
      pt: "Compre!",
      zh: "-"
    },
    "Intentar nuevamente": {
      es: "Intentar nuevamente",
      en: "Try again-",
      pt: "Tente novamente",
      zh: "-"
    },
    "Hay un error en los datos. Reinicia el juego y vuelve a intentar.": {
      es: "Hay un error en los datos. Reinicia el juego y vuelve a intentar.",
      en: "There is an error in the data. Restart the game and try again.",
      pt: "Há um erro nos dados. Reinicie o jogo e tente novamente.",
      zh: "-"
    },
    "Pago en espera": {
      es: "Pago en espera",
      en: "Payment on hold",
      pt: "Pagamento em espera",
      zh: "-"
    },
    "El pago esta en espera, una vez procesado se acreditaran las monedas": {
      es: "El pago esta en espera, una vez procesado se acreditaran las monedas",
      en: "The payment is waiting, once processed the coins will be credited",
      pt: "O pagamento está aguardando, uma vez processado as moedas serão creditadas",
      zh: "-"
    },
    "No se ha podido finalizar el pago debido a un problema temporal con la conexión. Si persiste este problema, póngase en contacto con el servicio de soporte técnico a info@jugaplay.com.": {
      es: "No se ha podido finalizar el pago debido a un problema temporal con la conexión. Si persiste este problema, póngase en contacto con el servicio de soporte técnico a info@jugaplay.com.",
      en: "The payment could not be completed due to a temporary problem with the connection. If this problem persists, contact the technical support service at info@jugaplay.com.",
      pt: "O pagamento não pôde ser concluído devido a um problema temporário com a conexão. Se esse problema persistir, entre em contato com o serviço de suporte técnico em info@jugaplay.com.",
      zh: "-"
    },
    "La transacción ha sido cancelada.": {
      es: "La transacción ha sido cancelada.",
      en: "The transaction has been canceled.",
      pt: "A transação foi cancelada.",
      zh: "-"
    },// FIN DEL MENU
    // INICIO
    "ELEGIR GRUPO": {
      es: "ELEGIR GRUPO",
      en: "CHOOSE GROUP",
      pt: "ESCOLHA O GRUPO",
      zh: "-"
    },
    "ELIGE UN GRUPO O CREAR UNO NUEVO": {
      es: "ELIGE UN GRUPO O CREAR UNO NUEVO",
      en: "CHOOSE A GROUP OR CREATE A NEW ONE",
      pt: "ESCOLHA UM GRUPO OU CRIE UM NOVO",
      zh: "-"
    },
    "Nuevo Grupo +": {
      es: "Nuevo Grupo +",
      en: "New Group +",
      pt: "Novo Grupo +",
      zh: "-"
    },
    "Crear un nuevo grupo": {
      es: "Crear un nuevo grupo",
      en: "Create a new group",
      pt: "Crie um novo grupo",
      zh: "-"
    },
    "CREAR UN NUEVO GRUPO": {
      es: "CREAR UN NUEVO GRUPO",
      en: "CREATE A NEW GROUP",
      pt: "CRIE UM NOVO GRUPO",
      zh: "-"
    },
    "Amigos": {
      es: "Amigos",
      en: "Friends",
      pt: "Amigos",
      zh: "-"
    },
    "Usuarios JugaPlay": {
      es: "Usuarios JugaPlay",
      en: "JugaPlay users",
      pt: "Usuários JugaPlay",
      zh: "-"
    },
    "Usuarios desafiados": {
      es: "Usuarios desafiados",
      en: "Challenge users",
      pt: "Usuários desafiados",
      zh: "-"
    },
    "Agregue usuarios al grupo": {
      es: "Agregue usuarios al grupo",
      en: "Add users to the group",
      pt: "Adicionar usuários ao grupo",
      zh: "-"
    },
    "Agregue usuarios al grupo": {
      es: "Agregue usuarios al grupo",
      en: "Add users to the group",
      pt: "Adicionar usuários ao grupo",
      zh: "-"
    },
    "Seleccionar partido": {
      es: "Seleccionar partido",
      en: "Select match",
      pt: "Selecione a partida",
      zh: "-"
    },
    "Todos los <strong>partidos</strong>": {
      es: "Todos los <strong>partidos</strong>",
      en: "All the <strong>matches</strong>",
      pt: "Todas as <strong>partidas</strong>",
      zh: "-"
    },
    "Torneo <strong>Argentino</strong>": {
      es: "Torneo <strong>Argentino</strong>",
      en: "<strong>Argentine</strong> Tournament",
      pt: "Torneio <strong>Argentino</strong>",
      zh: "-"
    },
    "Torneo <strong>Chileno</strong>": {
      es: "Torneo <strong>Chileno</strong>",
      en: "<strong>Chilean</strong> Tournament",
      pt: "Torneio <strong>Chileno</strong>",
      zh: "-"
    },
    "Champions <strong>league</strong>": {
      es: "Champions <strong>league</strong>",
      en: "Champions <strong>league</strong>",
      pt: "Champions <strong>league</strong>",
      zh: "-"
    },
    "Copa <strong>Libertadores</strong>": {
      es: "Copa <strong>Libertadores</strong>",
      en: "<strong>Libertadores</strong> Cup",
      pt: "Copa <strong>Libertadores</strong>",
      zh: "-"
    },
    "Liga <strong>Española</strong>": {
      es: "Liga <strong>Española</strong>",
      en: "Liga <strong>Española</strong>",
      pt: "Liga <strong>Española</strong>",
      zh: "-"
    },
    "Premier <strong>league</strong>": {
      es: "Premier <strong>league</strong>",
      en: "Premier <strong>league</strong>",
      pt: "Premier <strong>league</strong>",
      zh: "-"
    },
    "Partidos <strong>Especiales</strong>": {
      es: "Partidos <strong>Especiales</strong>",
      en: "<strong>Special</strong> Matches",
      pt: "Jogos <strong>Especiais</strong>",
      zh: "-"
    },
    "Torneo": {
      es: "Torneo",
      en: "Tournament",
      pt: "Torneio",
      zh: "-"
    },
    "EN VIVO": {
      es: "EN VIVO",
      en: "LIVE",
      pt: "AO VIVO",
      zh: "-"
    },
    "Partidos": {
      es: "Partidos",
      en: "Matches",
      pt: "Jogos",
      zh: "-"
    },
    "Partido": {
      es: "Partido",
      en: "Match",
      pt: "Jogo",
      zh: "-"
    },
    "Desafíos": {
      es: "Desafíos",
      en: "Challenges",
      pt: "Desafios",
      zh: "-"
    },
    "Contactos": {
      es: "Contactos",
      en: "Contacts",
      pt: "Contatos",
      zh: "-"
    },
    "Crear desafío": {
      es: "Crear desafío",
      en: "Create challenge",
      pt: "Criar desafio",
      zh: "-"
    },"Crear grupo y continuar": {
      es: "Crear grupo y continuar",
      en: "Create group and continue",
      pt: "Criar grupo e continuar",
      zh: "-"
    },
    "Agregue usuarios al grupo": {
      es: "Agregue usuarios al grupo",
      en: "Add users to the group",
      pt: "Adicionar usuários ao grupo",
      zh: "-"
    },
    "Seleccione usuarios": {
      es: "Seleccione usuarios",
      en: "Select users",
      pt: "Selecione usuários",
      zh: "-"
    },
    "No tiene usuarios seleccionados para armar el grupo.": {
      es: "You have no users selected to create the group.",
      en: "There are no users selected to create the group.",
      pt: "Não tem usuários selecionados para criar o grupo.",
      zh: "-"
    },
    "Necesita seleccionar al menos 1.": {
      es: "Necesita seleccionar al menos 1.",
      en: "You need to select at least 1.",
      pt: "Você precisa selecionar pelo menos 1.",
      zh: "-"
    },
    "CREAR UN NUEVO GRUPO": {
      es: "CREAR UN NUEVO GRUPO",
      en: "CREATE A NEW GROUP",
      pt: "CRIE UM GRUPO NOVO",
      zh: "-"
    },
    "Invitados": {
      es: "Invitados",
      en: "Guests",
      pt: "Convidados",
      zh: "-"
    },
    "Nombre del grupo": {
      es: "Nombre del grupo",
      en: "Group name",
      pt: "Nome do grupo",
      zh: "-"
    },
    challengeGroupName: {
      es: "Ingresa el nombre del grupo",
      en: "Enter the group name",
      pt: "Digite o nome do grupo",
      zh: "-"
    },
    "Modalidad de Juego": {
      es: "Modalidad de Juego",
      en: "Game Modality",
      pt: "Modalidade do jogo",
      zh: "-"
    },
    "Sin pozo ni entrada": {
      es: "Sin pozo ni entrada",
      en: "No fee or pot",
      pt: "Sem taxa ou pote",
      zh: "-"
    },
    "Ganador se lleva el pozo": {
      es: "Ganador se lleva el pozo",
      en: "Winner takes the pot",
      pt: "Vencedor leva o pote",
      zh: "-"
    },
    "Entrada": {
      es: "Entrada",
      en: "Fee",
      pt: "Taxa",
      zh: "-"
    },
    "Pozo estimado": {
      es: "Pozo estimado",
      en: "Estimated pot",
      pt: "Pote estimado",
      zh: "-"
    },
    "ELEGIR PARTIDO": {
      es: "ELEGIR PARTIDO",
      en: "CHOOSE MATCH",
      pt: "ESCOLHA PARTIDA",
      zh: "-"
    },
    "COMPLETAR DATOS": {
      es: "COMPLETAR DATOS",
      en: "COMPLETE DATA",
      pt: "COMPLETAR DATOS",
      zh: "-"
    },
    "ELEGIR": {
      es: "ELEGIR",
      en: "CHOOSE",
      pt: "ESCOLHA",
      zh: "-"
    },
    "Desafío armado": {
      es: "Desafío armado",
      en: "Challenge complete",
      pt: "Desafio armado",
      zh: "-"
    },
    "El desafío está  listo para ser jugado.": {
      es: "El desafío está  listo para ser jugado.",
      en: "The challenge is ready to be played.",
      pt: "O desafio está pronto para ser jogado.",
      zh: "-"
    },
    "Encuentra el mismo en el sector desafíos.": {
      es: "Encuentra el mismo en el sector desafíos.",
      en: "Find the same in the challenges sector.",
      pt: "Encontre o mesmo no setor de desafios.",
      zh: "-"
    },
    Ingreseelcódigo: {
      es: "Ingrese el código",
      en: "Enter the code",
      pt: "Digite o código",
      zh: "-"
    },
    "Sincronizar": {
      es: "Sincronizar",
      en: "Sync up",
      pt: "Sincronizar",
      zh: "-"
    },
    "Los 10 mejores": {
      es: "Los 10 mejores",
      en: "Top 10",
      pt: "O melhor 10",
      zh: "-"
    },
    "Ver todas las posiciones": {
      es: "Ver todas las posiciones",
      en: "See all positions",
      pt: "Veja todas as posições",
      zh: "-"
    },
    "Tienda de <strong>Premios</strong>": {
      es: "Tienda de <strong>Premios</strong>",
      en: "Store <strong> Awards </strong>",
      pt: "Loja <strong> Prêmios </strong>",
      zh: "-"
    },
    "Gana fichas invita <strong>amigos</strong>": {
      es: "Gana fichas invita <strong>amigos</strong>",
      en: "Win chips invite <strong>friends</strong>",
      pt: "Ganhe fichas convide <strong>amigos</strong>",
      zh: "-"
    },
    "Cómo <strong>jugar</strong>": {
      es: "Cómo <strong>jugar</strong>",
      en: "How to <strong>play</strong>",
      pt: "Como <strong>jogar</strong>",
      zh: "-"
    },
    "Buscar a mis amigos de facebook": {
      es: "Buscar a mis amigos de facebook",
      en: "Search my facebook friends",
      pt: "Pesquise meus amigos do Facebook",
      zh: "-"
    },
    "Agregar mail para ser encontrado": {
      es: "Agregar mail para ser encontrado",
      en: "Add mail to be found",
      pt: "Adicionar o correio a ser encontrado",
      zh: "-"
    },
    "Buscar amigos en gmail/ android / google": {
      es: "Buscar amigos en gmail/ android / google",
      en: "Search my gmail/ android / google friends",
      pt: "Pesquise meus amigos do gmail/ android / google",
      zh: "-"
    },
    "Todas las opciones sincronizadas.": {
      es: "Todas las opciones sincronizadas.",
      en: "All synchronized options",
      pt: "Todas as opções sincronizadas",
      zh: "-"
    },
    "Sincroniza las distintas opciones faltantes, encuentra que amigos tuyos tienen una cuenta de Jugaplay y desafialos.": {
      es: "Sincroniza las distintas opciones faltantes, encuentra que amigos tuyos tienen una cuenta de Jugaplay y desafialos.",
      en: "Synchronize the different missing options, find that your friends have a Jugaplay account and challenge them.",
      pt: "Sincronize as diferentes opções ausentes, ache que seus amigos tenham uma conta Jugaplay e desafiem-los.",
      zh: "-"
    },
    "Enero": {
      es: "Enero",
      en: "January",
      pt: "Janeiro",
      zh: "-"
    },
    "Febrero": {
      es: "Febrero",
      en: "February",
      pt: "Fevereiro",
      zh: "-"
    },
    "Marzo": {
      es: "Marzo",
      en: "March",
      pt: "Março",
      zh: "-"
    },
    "Abril": {
      es: "Abril",
      en: "April",
      pt: "Abril",
      zh: "-"
    },
    "Mayo": {
      es: "Mayo",
      en: "May",
      pt: "Maio",
      zh: "-"
    },
    "Junio": {
      es: "Junio",
      en: "June",
      pt: "Junho",
      zh: "-"
    },
    "Julio": {
      es: "Julio",
      en: "July",
      pt: "Julho",
      zh: "-"
    },
    "Agosto": {
      es: "Agosto",
      en: "August",
      pt: "Agosto",
      zh: "-"
    },
    "Septiembre": {
      es: "Septiembre",
      en: "September",
      pt: "Setembro",
      zh: "-"
    },
    "Octubre": {
      es: "Octubre",
      en: "October",
      pt: "Outubro",
      zh: "-"
    },
    "Noviembre": {
      es: "Noviembre",
      en: "November",
      pt: "Novembro",
      zh: "-"
    },
    "Diciembre": {
      es: "Diciembre",
      en: "December",
      pt: "Dezembro",
      zh: "-"
    },
    "ENE": {
      es: "ENE",
      en: "JAN",
      pt: "JAN",
      zh: "-"
    },
    "FEB": {
      es: "FEB",
      en: "FEB",
      pt: "FEV",
      zh: "-"
    },
    "MAR": {
      es: "MAR",
      en: "MAR",
      pt: "MAR",
      zh: "-"
    },
    "ABR": {
      es: "ABR",
      en: "APR",
      pt: "ABR",
      zh: "-"
    },
    "MAY": {
      es: "MAY",
      en: "MAY",
      pt: "MAI",
      zh: "-"
    },
    "JUN": {
      es: "JUN",
      en: "JUN",
      pt: "JUN",
      zh: "-"
    },
    "JUL": {
      es: "JUL",
      en: "JUL",
      pt: "JUL",
      zh: "-"
    },
    "AGO": {
      es: "AGO",
      en: "AUG",
      pt: "AGO",
      zh: "-"
    },
    "SEP": {
      es: "SEP",
      en: "SEP",
      pt: "SET",
      zh: "-"
    },
    "OCT": {
      es: "OCT",
      en: "OCT",
      pt: "OUT",
      zh: "-"
    },
    "NOV": {
      es: "NOV",
      en: "NOV",
      pt: "NOV",
      zh: "-"
    },
    "DEC": {
      es: "DEC",
      en: "DEC",
      pt: "DEZ",
      zh: "-"
    },
    "<b>Partido Amistoso</b><br><small>Anotado</small>": {
      es: "<b>Partido Amistoso</b><br><small>Anotado</small>",
      en: "<b>Friendly Match</b><br><small>Annotated</small>",
      pt: "<b>Partida Amistosa</b><br><small>Anotado</small>",
      zh: "-"
    },
    "Amistoso": {
      es: "Amistoso",
      en: "Friendly",
      pt: "Amistoso",
      zh: "-"
    },
    "Partido Amistoso": {
      es: "Partido Amistoso",
      en: "Friendly Match",
      pt: "Partida Amistosa",
      zh: "-"
    },
    "Partido Oficial": {
      es: "Partido Oficial",
      en: "Official Match",
      pt: "Partida Oficial",
      zh: "-"
    },
    "<b>Partido Oficial</b><br><small>Anotado</small>": {
      es: "<b>Partido Oficial</b><br><small>Anotado</small>",
      en: "<b>Official Match</b><br><small>Annotated</small>",
      pt: "<b>Partida Oficial</b><br><small>Anotado</small>",
      zh: "-"
    },
    "Oficial": {
      es: "Oficial",
      en: "Official",
      pt: "Oficial",
      zh: "-"
    },
    "Anotado": {
      es: "Anotado",
      en: "Annotated",
      pt: "Anotado",
      zh: "-"
    },
    "Jugar": {
      es: "Jugar",
      en: "Play",
      pt: "Jogar",
      zh: "-"
    },
    "Torneo Argentino": {
      es: "Torneo Argentino",
      en: "Argentine Tournament",
      pt: "Torneio Argentino",
      zh: "-"
    },
    "Torneo Chileno": {
      es: "Torneo Chileno",
      en: "Chilean Tournament",
      pt: "Torneio Chileno",
      zh: "-"
    },
    "Champions league": {
      es: "Champions league",
      en: "Champions league",
      pt: "Champions league",
      zh: "-"
    },
    "Copa Libertadores": {
      es: "Copa Libertadores",
      en: "Libertadores Cup",
      pt: "Copa Libertadores",
      zh: "-"
    },
    "Liga Española": {
      es: "Liga Española",
      en: "Liga Española",
      pt: "Liga Española",
      zh: "-"
    },
    "Premier league": {
      es: "Premier league",
      en: "Premier league",
      pt: "Premier league",
      zh: "-"
    },
    "Partidos Especiales": {
      es: "Partidos Especiales",
      en: "Special Matches",
      pt: "Jogos Especiais",
      zh: "-"
    },
    "SELECCIONAR JUGADORES": {
      es: "SELECCIONAR JUGADORES",
      en: "SELECT PLAYERS",
      pt: "SELECIONE JOGADORES",
      zh: "-"
    },
    "PUNTAJES": {
      es: "PUNTAJES",
      en: "POINTS",
      pt: "PONTOS",
      zh: "-"
    },
    "DATOS": {
      es: "DATOS",
      en: "DATA",
      pt: "DADOS",
      zh: "-"
    },
    "Anotados": {
      es: "Anotados",
      en: "Annotated",
      pt: "Anotados",
      zh: "-"
    },
    "Selecciona": {
      es: "Selecciona",
      en: "Select",
      pt: "Selecione",
      zh: "-"
    },
    "de los jugadores disponibles": {
      es: "de los jugadores disponibles",
      en: "from available players",
      pt: "dos jogadores disponíveis",
      zh: "-"
    },
    "Posición": {
      es: "Posición",
      en: "Position",
      pt: "Posição",
      zh: "-"
    },
    "Nombre": {
      es: "Nombre",
      en: "Name",
      pt: "Nome",
      zh: "-"
    },
    "Equipo": {
      es: "Equipo",
      en: "Team",
      pt: "Equipe",
      zh: "-"
    },
    'En caso de empate: desempatan el capitan <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;"> y luego el sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;">': {
      es: 'En caso de empate: desempatan el capitan <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;"> y luego el sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;">',
      en: 'In case of a tie: tie the captain <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;"> and then the sub captain <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;">',
      pt: 'Em caso de empate: amarre o capitão <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;"> e depois o sub capitão <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;">',
      zh: "-"
    },
    "jugadores": {
      es: "jugadores",
      en: "players",
      pt: "jogadores",
      zh: "-"
    },
    "JUGADORES": {
      es: "JUGADORES",
      en: "PLAYERS",
      pt: "JOGADORES",
      zh: "-"
    },
    "Falta agregar": {
      es: "Falta agregar",
      en: "Need to add",
      pt: "Falta adicionar",
      zh: "-"
    },
    "Listado Completo": {
      es: "Listado Completo",
      en: "Selection completed",
      pt: "Lista completa",
      zh: "-"
    },
    "Ya selecciono los": {
      es: "Ya seleccionó los",
      en: "You have already selected the",
      pt: "Você já selecionou o",
      zh: "-"
    },
    "jugadores para jugar esta mesa. Si desea agregar uno distinto debe sacar uno del listado de seleccionados.": {
      es: "jugadores para jugar esta mesa. Si desea agregar uno distinto debe sacar uno del listado de seleccionados.",
      en: "players to play this table. If you want to add a different one, you must remove one from the selected list.",
      pt: "jogadores para jogar esta mesa. Se você quiser adicionar um diferente, você deve remover um da lista selecionada.",
      zh: "-"
    },
    "FALTAN": {
      es: "FALTAN",
      en: "MISSING",
      pt: "FALTAN",
      zh: "-"
    },
    "JUGAR OFICIAL": {
      es: "JUGAR OFICIAL",
      en: "PLAY OFFICIAL",
      pt: "JOGAR OFICIAL",
      zh: "-"
    },
    "JUGAR DESAFIO": {
      es: "JUGAR DESAFÍO",
      en: "PLAY CHALLENGE",
      pt: "JOGAR DESAFIO",
      zh: "-"
    },
    "JUGAR": {
      es: "JUGAR",
      en: "PLAY",
      pt: "JOGAR",
      zh: "-"
    },
    "Faltan Jugadores": {
      es: "Faltan Jugadores",
      en: "Missing Players",
      pt: "Faltam Jogadores",
      zh: "-"
    },
    "Debe seleccionar": {
      es: "Debe seleccionar",
      en: "You must select",
      pt: "Você deve selecionar",
      zh: "-"
    },
    "jugadores para jugar esta mesa.": {
      es: "jugadores para jugar esta mesa.",
      en: "players to play this table.",
      pt: "jogadores para jogar esta mesa.",
      zh: "-"
    },
    "Monedas Insuficientes": {
      es: "Monedas Insuficientes",
      en: "Insufficient coins",
      pt: "Moedas insuficientes",
      zh: "-"
    },
    "Tienes": {
      es: "Tienes",
      en: "You have",
      pt: "Você tem",
      zh: "-"
    },
    "Monedas y el partido requiere": {
      es: "Monedas y el partido requiere",
      en: "Coins and the match requires",
      pt: "Moedas e a partida exigem",
      zh: "-"
    },
    "para anotarse.": {
      es: "para anotarse.",
      en: "to sign up.",
      pt: "para se inscrever.",
      zh: "-"
    },
    "FICHAS": {
      es: "FICHAS",
      en: "CHIPS",
      pt: "FICHAS",
      zh: "-"
    },
    "insuficientes": {
      es: "insuficientes",
      en: "insufficient",
      pt: "insuficiente",
      zh: "-"
    },
    "Le faltan": {
      es: "Le faltan",
      en: "Isso é curto em",
      pt: "You are missing",
      zh: "-"
    },
    "para poder jugar el partido": {
      es: "para poder jugar el partido",
      en: "to play the game",
      pt: "para jogar o jogo",
      zh: "-"
    },
    "CONSEGUIR": {
      es: "CONSEGUIR",
      en: "GET",
      pt: "OBTENHA",
      zh: "-"
    },
    "YA ELEGISTE TUS JUGADORES! AHORA JUGÁLO EN VIVO!": {
      es: "YA ELEGISTE TUS JUGADORES! AHORA JUGÁLO EN VIVO!",
      en: "YOU ALREADY CHOOSE YOUR PLAYERS! NOW PLAY IT LIVE!",
      pt: "VOCÊ JÁ ESCOLHA OS SEUS JOGADORES! AGORA JÁ VIVO!",
      zh: "-"
    },
    "1- Ingresa en Jugaplay cuando comienza el partido.": {
      es: "1- Ingresa en Jugaplay cuando comienza el partido.",
      en: "1- Enter Jugaplay when the match begins.",
      pt: "1- Entre em Jugaplay quando a partida começar.",
      zh: "-"
    },
    "2- Clickea \"PARTIDOS EN VIVO\" para seguir el rendimiento de tus jugadores y monedas minuto a minuto!": {
      es: "2- Clickea \"PARTIDOS EN VIVO\" para seguir el rendimiento de tus jugadores y monedas minuto a minuto!",
      en: "2- Click \"LIVE GAMES\" to track your players' performance and coins minute by minute!",
      pt: "2- Clique em \"VIVO\" para rastrear o desempenho e as moedas dos seus jogadores minuto a minuto!",
      zh: "-"
    },
    "3- Al finalizar el partido, ingresa a tu historial o espera un email que te llegará al instante con tu resultado.": {
      es: "3- Al finalizar el partido, ingresa a tu historial o espera un email que te llegará al instante con tu resultado.",
      en: "3- At the end of the game, enter your history or wait for an email that will arrive instantly with your result.",
      pt: "3- No final do jogo, digite seu histórico ou aguarde um e-mail que chegará instantaneamente com seu resultado.",
      zh: "-"
    },
    "Gracias por Jugar": {
      es: "Gracias por Jugar",
      en: "Thanks for playing",
      pt: "Obrigado por jogar",
      zh: "-"
    },
    "Registro Completo": {
      es: "Registro Completo",
      en: "Complete Registration",
      pt: "Registro Completo",
      zh: "-"
    },
    "Se ha registrado correctamente en Jugaplay. En la sección mi perfil podrá editar el resto de sus datos.": {
      es: "Se ha registrado correctamente en Jugaplay. En la sección mi perfil podrá editar el resto de sus datos.",
      en: "It has been successfully registered in Jugaplay. In my profile section you can edit the rest of your data.",
      pt: "Foi registrado com sucesso no Jugaplay. Na seção meu perfil, você pode editar o resto de seus dados.",
      zh: "-"
    },
    "Arquero": {
      es: "Arquero",
      en: "Goalkeeper",
      pt: "Goleiro",
      zh: "-"
    },
    "Defensor": {
      es: "Defensor",
      en: "Defender",
      pt: "Defensor",
      zh: "-"
    },
    "Mediocampista": {
      es: "Mediocampista",
      en: "Midfielder",
      pt: "Meio-campista",
      zh: "-"
    },
    "Delantero": {
      es: "Delantero",
      en: "Forward",
      pt: "Atacante",
      zh: "-"
    },
    "Para cada jugador que finalice mitad de tabla para arriba.": {
      es: "Para cada jugador que finalice mitad de tabla para arriba.",
      en: "For each player who finishes half of the board up.",
      pt: "Para cada jogador que terminou melhor da metade do tabuleiro.",
      zh: "-"
    },
    "Gratis": {
      es: "Gratis",
      en: "Free",
      pt: "Grátis",
      zh: "-"
    },
    "Posiciones": {
      es: "Posiciones",
      en: "Positions",
      pt: "Posições",
      zh: "-"
    },
    "Premio": {
      es: "Premio",
      en: "Award",
      pt: "Prêmio",
      zh: "-"
    },
    "Jugadores": {
      es: "Jugadores",
      en: "Players",
      pt: "Jogadores",
      zh: "-"
    },
    "Disparo al arco": {
      es: "Disparo al arco",
      en: "Shot to goal",
      pt: "Tiro de tiro ao arco",
      zh: "-"
    },
    "Disparo al palo": {
      es: "Disparo al palo",
      en: "Shot to the post",
      pt: "Disparado na vara",
      zh: "-"
    },
    "Disparo afuera": {
      es: "Shot out ",
      en: "Deviated shot",
      pt: "Tiro desviado",
      zh: "-"
    },
    "Goles": {
      es: "Goles",
      en: "Goals",
      pt: "Golos",
      zh: "-"
    },
    "Goles (DEF)": {
      es: "Goles (DEF)",
      en: "Goals (DEF)",
      pt: "Golos (DEF)",
      zh: "-"
    },
    "Goles (ARQ)": {
      es: "Goles (ARQ)",
      en: "Goals (GK)",
      pt: "Golos (GLR)",
      zh: "-"
    },
    "Tarjetas": {
      es: "Tarjetas",
      en: "Cards",
      pt: "Cartão",
      zh: "-"
    },
    "Tarjeta amarilla": {
      es: "Tarjeta amarilla",
      en: "Yellow card",
      pt: "Cartão amarelo",
      zh: "-"
    },
    "Tarjeta roja": {
      es: "Tarjeta roja",
      en: "Red card",
      pt: "Cartão vermelho",
      zh: "-"
    },
    "Pases correctos": {
      es: "Pases correctos",
      en: "Correct passes",
      pt: "Passo direito",
      zh: "-"
    },
    "Pases incorrectos": {
      es: "Pases correctos",
      en: "Bad passes",
      pt: "Passes errados",
      zh: "-"
    },
    "Faltas": {
      es: "Faltas",
      en: "Fouls",
      pt: "Faltas",
      zh: "-"
    },
    "Recuperaciones": {
      es: "Recuperaciones",
      en: "Recoveries",
      pt: "Recuperações",
      zh: "-"
    },
    "Asistencias": {
      es: "Asistencias",
      en: "Assists",
      pt: "Assistências",
      zh: "-"
    },
    "Fuera de juego": {
      es: "Fuera de juego",
      en: "Offside",
      pt: "Impedimento",
      zh: "-"
    },
    "Atajadas": {
      es: "Atajadas",
      en: "Saves",
      pt: "Salvadas",
      zh: "-"
    },
    "Penal errado": {
      es: "Penal errado",
      en: "Miss Penalty",
      pt: "pênalti errado",
      zh: "-"
    },
    "Penal atajado (ARQ)": {
      es: "Penal atajado (ARQ)",
      en: "Saved penalty (GK)",
      pt: "Pênalti salvado (GOLE)",
      zh: "-"
    },
    "Penales": {
      es: "Penales",
      en: "Penalties",
      pt: "Pênalties",
      zh: "-"
    },
    "Gol al arquero(ARQ)": {
      es: "Gol al arquero(ARQ)",
      en: "Goal to goalkeeper (GK)",
      pt: "Gol al goleiro (GOLE)",
      zh: "-"
    },
    "Valla invicta (ARQ)": {
      es: "Valla invicta (ARQ)",
      en: "Unbeaten fence (GK)",
      pt: "Cerca invicta (GOLE)",
      zh: "-"
    },
    "Valla invicta (DEF)": {
      es: "Valla invicta (DEF)",
      en: "Unbeaten fence (DEF)",
      pt: "Cerca invicta (DEF)",
      zh: "-"
    },
    "Valla invicta": {
      es: "Valla invicta",
      en: "Unbeaten fence",
      pt: "Cerca invicta",
      zh: "-"
    },
    "Equipo ganador": {
      es: "Equipo ganador",
      en: "Winning team",
      pt: "Time vencedor",
      zh: "-"
    },
    "Información no disponible": {
      es: "Información no disponible",
      en: "Information not available",
      pt: "Informação não disponível",
      zh: "-"
    },
    "Entrada": {
      es: "Entrada",
      en: "Entry",
      pt: "Entrada",
      zh: "-"
    },
    "Debe seleccionar": {
      es: "Debe seleccionar",
      en: "You must select",
      pt: "Você deve selecionar",
      zh: "-"
    },
    "Los jugadores que elijas serán evaluados según su desempeño en el partido. Sumaran puntos acorde a la siguiente tabla.": {
      es: "Los jugadores que elijas serán evaluados según su desempeño en el partido. Sumaran puntos acorde a la siguiente tabla.",
      en: "The players you choose will be evaluated according to their performance in the match. The points are added according to the following table.",
      pt: "Os jogadores que você escolher serão avaliados de acordo com seu desempenho na partida. Os pontos se adicionan de acordo com a tabela a seguir.",
      zh: "-"
    },
    "Incidencia": {
      es: "Incidence",
      en: "Incidence",
      pt: "Incidência",
      zh: "-"
    },
    "Puntaje": {
      es: "Puntaje",
      en: "Score",
      pt: "Ponto",
      zh: "-"
    },
    "Para jugar esta mesa debes elegir": {
      es: "Para jugar esta mesa debes elegir",
      en: "To play this table you must choose",
      pt: "Para jogar esta partida, você deve escolher",
      zh: "-"
    },// Grupos
    "GRUPO": {
      es: "GRUPO",
      en: "GROUP",
      pt: "GRUPO",
      zh: "-"
    },
    "Grupo": {
      es: "Grupo",
      en: "Group",
      pt: "Grupo",
      zh: "-"
    },
    "Invitados": {
      es: "Invitados",
      en: "Guests",
      pt: "Convidados",
      zh: "-"
    },
    "Pozo actual": {
      es: "Pozo actual",
      en: "Actual Pot",
      pt: "Pote atual",
      zh: "-"
    },
    "Añadir participantes": {
      es: "Añadir participantes",
      en: "Add participants",
      pt: "Adicionar participantes",
      zh: "-"
    },
    "Agrega gente al grupo": {
      es: "Agrega gente al grupo",
      en: "Add people to the group",
      pt: "Adicione pessoas ao grupo",
      zh: "-"
    },
    "Salir del grupo": {
      es: "Salir del grupo",
      en: "Exit the group",
      pt: "Sair do grupo",
      zh: "-"
    },
    "No quiero pertenecer mas a este grupo": {
      es: "No quiero pertenecer más a este grupo",
      en: "I do not want to belong anymore to this group",
      pt: "Eu não quero mais pertencer a este grupo",
      zh: "-"
    },
    "Participantes": {
      es: "Participantes",
      en: "Participants",
      pt: "Participantes",
      zh: "-"
    },
    "Estos son los participantes del grupo": {
      es: "Estos son los participantes del grupo",
      en: "These are the group participants",
      pt: "Estes são os participantes do grupo",
      zh: "-"
    },
    "Usar códigos": {
      es: "Usar códigos",
      en: "Use codes",
      pt: "Use códigos",
      zh: "-"
    },
    "Es el pozo que se generaría si juegan todos los usuarios invitados al desafío.": {
      es: "Es el pozo que se generaría si juegan todos los usuarios invitados al desafío.",
      en: "It is the pot that would be generated if all the users invited to the challenge play.",
      pt: "É o pote que seria gerado se todos os usuários convidados para o desafio jogarem.",
      zh: "-"
    },
    "Es el pozo que se acumuló gracias a los usuarios que ya hicieron su jugada, los anotados. Este va a ir creciendo a medida que los usuarios jueguen el desafío.": {
      es: "Es el pozo que se acumuló gracias a los usuarios que ya hicieron su jugada, los anotados. Este va a ir creciendo a medida que los usuarios jueguen el desafío.",
      en: "It is the pot that was accumulated thanks to the users who already made their move, the ones scored. This will grow as users play the challenge.",
      pt: "É o pote que foi acumulado graças aos usuários que já fizeram seu movimento, os que marcaram. Isso crescerá à medida que os usuários jogam o desafio.",
      zh: "-"
    },
    "Son los usuarios que ya realizaron su jugada. Y pusieron sus monedas en el pozo.": {
      es: "Son los usuarios que ya realizaron su jugada. Y pusieron sus monedas en el pozo.",
      en: "These are the users who have already made their move. And they put their coins in the pot.",
      pt: "Estes são os usuários que já fizeram sua jogada. E colocaram suas moedas no pote.",
      zh: "-"
    },
    "Son los usuarios que componen el grupo. Que están invitados a jugar el desafío.": {
      es: "Son los usuarios que componen el grupo. Que están invitados a jugar el desafío.",
      en: "They are the users that make up the group. That you are invited to play the challenge.",
      pt: "São os usuários que compõem o grupo. Que você esteja convidado a enfrentar o desafio.",
      zh: "-"
    },
    "1. Copiar el código y enviar a amigos que quieras invitar al desafío.": {
      es: "1. Copiar el código y enviar a amigos que quieres invitar al desafío.",
      en: "1. Copy the code and send friends you want to invite to the challenge.",
      pt: "1. Copie o código e envie amigos que deseja convidar para o desafio.",
      zh: "-"
    },
    "2. Tus amigos tienen que ingresar el código en el sector desafíos.": {
      es: "2. Tus amigos tienen que ingresar el código en el sector desafíos.",
      en: "2. Your friends have to enter the code in the challenges sector.",
      pt: "2. Seus amigos devem inserir o código no setor de desafios.",
      zh: "-"
    },
    "3. ¡Listo! Podrás desafiar a tus amigos.": {
      es: "3. ¡Listo! Puedes desafiar a tus amigos.",
      en: "3. Ready! You can challenge your friends.",
      pt: "3. Pronto! Você pode desafiar seus amigos.",
      zh: "-"
    },
    "Agregar a amigos +": {
      es: "Agregar a amigos +",
      en: "Add to friends +",
      pt: "Adicionar a amigos +",
      zh: "-"
    },
    "Pendiente": {
      es: "Pendiente",
      en: "Pending",
      pt: "Pendente",
      zh: "-"
    },
    "Agregar como amigo": {
      es: "Agregar como amigo",
      en: "Add as friend",
      pt: "Adicionar como amigo",
      zh: "-"
    },
    "Agregar como amigo eligiendo un Nombre o Apodo con el que reconocer a este usuario de ahora en adelante.": {
      es: "Agregar como amigo eligiendo un Nombre o Apodo con el que reconocer a este usuario de ahora en adelante.",
      en: "Add as a friend by choosing a Name or Nickname with which to recognize this user from now on.",
      pt: "Adicione como amigo escolhendo um Nome ou apelido para reconhecer esse usuário a partir de agora.",
      zh: "-"
    },
    "Nombre/Apodo:": {
      es: "Nombre / Apodo:",
      en: "Name / Nickname:",
      pt: "Nome / apelido:",
      zh: "-"
    },
    NombreApodo: {
      es: "Nombre / Apodo:",
      en: "Name / Nickname:",
      pt: "Nome / apelido:",
      zh: "-"
    },
    "Guardar": {
      es: "Guardar",
      en: "Save",
      pt: "Salvar",
      zh: "-"
    },
    "Ingrese un Nombre o Apodo con el que reconocer a este usuario en un futuro.": {
      es: "Ingrese un Nombre o Apodo con el que reconoce a este usuario en un futuro.",
      en: "Enter a Name or Nickname with which you recognize this user in the future.",
      pt: "Digite um nome ou apelido com o qual você reconhece esse usuário no futuro.",
      zh: "-"
    },
    "Confirmación necesaria": {
      es: "Confirmación necesaria",
      en: "Confirmation required",
      pt: "É necessária confirmação",
      zh: "-"
    },
    "Salir": {
      es: "Salir",
      en: "Exit",
      pt: "Sair",
      zh: "-"
    },
    "¿Desea salir del grupo?": {
      es: "¿Desea salir del grupo?",
      en: "Do you want to leave the group?",
      pt: "Você quer deixar o grupo?",
      zh: "-"
    },
    "Al salir no podrá ver más detalles del grupo y perderá el privilegio de ver el detalle de los partidos que jugo dentro del mismo.": {
      es: "Al salir no podrá ver más detalles del grupo y perderá el privilegio de ver el detalle de los partidos que jugo dentro del mismo.",
      en: "When leaving you will not be able to see more details of the group and you will lose the privilege of seeing the details of the matches you played in it.",
      pt: "Ao sair, você não poderá ver mais detalhes do grupo e você perderá o privilégio de ver os detalhes das partidas que você jogou nela.",
      zh: "-"
    },
    "Copiar código": {
      es: "Copiar código",
      en: "Copy code",
      pt: "Copiar código",
      zh: "-"
    },
    "Código valido por 48Hs": {
      es: "Código valido por 48Hs",
      en: "Code valid for 48 Hs",
      pt: "Código válido para 48 Hs",
      zh: "-"
    },
    "Invita a usuarios al desafío con este código": {
      es: "Invita a usuarios al desafío con este código",
      en: "Invite users to challenge with this code",
      pt: "Convide usuários a desafiar com este código",
      zh: "-"
    },
    "Mi posición en esta mesa": {
      es: "Mi posición en esta mesa",
      en: "My position in this table",
      pt: "Minha posição nesta tabela",
      zh: "-"
    },
    "Monedas Obtenidas": {
      es: "Monedas Obtenidas",
      en: "Coins Obtained",
      pt: "Moedas Obtidas",
      zh: "-"
    },
    "Código erróneo": {
      es: "Código erróneo",
      en: "Wrong code",
      pt: "Código errado",
      zh: "-"
    },
    "No se encontró ningún grupo o desafío con ese código, por favor verifique que el mismo se ingresara correctamente.": {
      es: "No se encontró ningún grupo o desafío con ese código, por favor verifique que el mismo se ingresara correctamente.",
      en: "No group or challenge was found with that code, please verify that it is entered correctly.",
      pt: "Nenhum grupo ou desafio foi encontrado com esse código, verifique se ele foi inserido corretamente.",
      zh: "-"
    },
    "Bien venido a": {
      es: "Bien venido a",
      en: "Welcome to",
      pt: "Bem-vindo a",
      zh: "-"
    },
    "Ya sos parte del grupo": {
      es: "Ya sos parte del grupo",
      en: "You are part of the group",
      pt: "Você já faz parte do grupo",
      zh: "-"
    },
    "y podrás jugar sus desafíos.": {
      es: "y podrás jugar sus desafíos.",
      en: "and you can play the groups challenges.",
      pt: "e você pode desempenhar seus desafios.",
      zh: "-"
    },
    "ABRIR": {
      es: "ABRIR",
      en: "OPEN",
      pt: "ABERTO",
      zh: "-"
    },
    "Puntos sumados por Jugadores": {
      es: "Puntos sumados por Jugadores",
      en: "Points of players",
      pt: "Pontos acumulados pelos jogadores",
      zh: "-"
    },
    "DUPLICA con": {
      es: "DUPLICA con",
      en: "DUPLICATE with",
      pt: "DUPLICATE com",
      zh: "-"
    },
    "CANJEA": {
      es: "CANJEA",
      en: "EXCHANGE",
      pt: "TROCAR",
      zh: "-"
    },
    "por": {
      es: "por",
      en: "for",
      pt: "por",
      zh: "-"
    },
    "para poder activar el": {
      es: "para poder activar el",
      en: "to be able to activate the",
      pt: "para poder ativar o",
      zh: "-"
    },
    "Algo salió mal": {
      es: "Algo salió mal",
      en: "Something went wrong",
      pt: "Algo deu errado",
      zh: "-"
    },
    "Jugar el partido": {
      es: "Jugar el partido",
      en: "Play the game",
      pt: "Jogue o jogo",
      zh: "-"
    },
    "Antes de usar el": {
      es: "Antes de usar el",
      en: "Before using the",
      pt: "Antes de usar o",
      zh: "-"
    },
    "es necesario jugar el partido.": {
      es: "es necesario jugar el partido.",
      en: "It is necessary to play the game.",
      pt: "É necessário jogar o jogo.",
      zh: "-"
    },
    "X2 Activado": {
      es: "X2 Activado",
      en: "X2 On",
      pt: "X2 On",
      zh: "-"
    },
    "El": {
      es: "El",
      en: "The",
      pt: "O",
      zh: "-"
    },
    "ya está activado para este partido.": {
      es: "ya está activado para este partido.",
      en: "is already activated for this game.",
      pt: "já está ativado para este jogo.",
      zh: "-"
    },
    "Partidos en vivo": {
      es: "Partidos en vivo",
      en: "Live matches",
      pt: "Partidas ao vivo",
      zh: "-"
    },
    "Sin partidos disponibles": {
      es: "Sin partidos disponibles",
      en: "No matches available",
      pt: "Não há jogos disponíveis",
      zh: "-"
    },
    "Filtrar Jugadores": {
      es: "Filtrar Jugadores",
      en: "Filter players",
      pt: "Filtrar jogadores",
      zh: "-"
    },
    "LIGA JUGAPLAY": {
      es: "LIGA JUGAPLAY",
      en: "JUGAPLAY LEAGUE",
      pt: "LIGA JUGAPLAY",
      zh: "-"
    },
    "Liga Jugaplay": {
      es: "Liga Jugaplay",
      en: "Jugaplay league",
      pt: "Liga Jugaplay",
      zh: "-"
    },
    "Del": {
      es: "Del",
      en: "From",
      pt: "De",
      zh: "-"
    },
    "al": {
      es: "al",
      en: "to",
      pt: "para",
      zh: "-"
    },
    "Tu posición": {
      es: "Tu posición",
      en: "Your position",
      pt: "Sua posição",
      zh: "-"
    },
    "Fecha": {
      es: "Fecha",
      en: "Date",
      pt: "Data",
      zh: "-"
    },
    "Puesto": {
      es: "Puesto",
      en: "Place",
      pt: "Lugar",
      zh: "-"
    },
    "1ER. PUESTO": {
      es: "1ER. PUESTO",
      en: "1ST PLACE",
      pt: "1º LUGAR",
      zh: "-"
    },
    "2DO. PUESTO": {
      es: "2DO. PUESTO",
      en: "2ST PLACE",
      pt: "2º LUGAR",
      zh: "-"
    },
    "3ER. PUESTO": {
      es: "3ER. PUESTO",
      en: "3ST PLACE",
      pt: "3º LUGAR",
      zh: "-"
    },
    "PREMIO": {
      es: "PREMIO",
      en: "AWARD",
      pt: "PRÊMIO",
      zh: "-"
    },
    "partidos": {
      es: "partidos",
      en: "matches",
      pt: "jogos",
      zh: "-"
    },
    "por fecha": {
      es: "por fecha",
      en: "per date",
      pt: "por data",
      zh: "-"
    },
    "participantes": {
      es: "participantes",
      en: "participants",
      pt: "participantes",
      zh: "-"
    },
    "Ver detalle": {
      es: "Ver detalle",
      en: "See detail",
      pt: "Ver detalhes",
      zh: "-"
    },
    "Puntaje para liga": {
      es: "Puntaje para liga",
      en: "League score",
      pt: "Pontuação da liga",
      zh: "-"
    },
    "Premio Obtenido": {
      es: "Premio Obtenido",
      en: "Obtained Prize",
      pt: "Prêmio Obtido",
      zh: "-"
    },
    "Puntos": {
      es: "Puntos",
      en: "Score",
      pt: "Ponto",
      zh: "-"
    },
    "Ya no puede ver la información de este desafío debido a que no pertenece más a este grupo.": {
      es: "Ya no puede ver la información de este desafío debido a que no pertenece más a este grupo.",
      en: "You can no longer view the information for this challenge because you no longer belong to this group.",
      pt: "Ya não pode ver a informação de este desafio por causa de não pertencer a este grupo.",
      zh: "-"
    },
    "Detalle no disponible": {
      es: "Detalle no disponible",
      en: "Detail not available",
      pt: "Detalhe não disponível",
      zh: "-"
    },
    "Detalle": {
      es: "Detalle",
      en: "Detail",
      pt: "Detalhe",
      zh: "-"
    },
    "Puntos totales": {
      es: "Puntos totales",
      en: "Total score",
      pt: "Pontuação total",
      zh: "-"
    },
    "Disparos": {
      es: "Disparos",
      en: "Shots",
      pt: "Tiros",
      zh: "-"
    },
    "Puntos por disparo": {
      es: "Puntos por disparo",
      en: "Points for shots",
      pt: "Pontuação para tiros",
      zh: "-"
    },
    "Tarjetas": {
      es: "Tarjetas",
      en: "Cards",
      pt: "Cartões",
      zh: "-"
    },
    "Pases": {
      es: "Pases",
      en: "Passes",
      pt: "Passes",
      zh: "-"
    },
    "Puntos por tarjetas": {
      es: "Puntos por tarjetas",
      en: "Score for cards",
      pt: "Pontuação para cartões",
      zh: "-"
    },
    "Puntos por pases": {
      es: "Puntos por pases",
      en: "Score for passes",
      pt: "Pontuação para passes",
      zh: "-"
    },
    "Canjear": {
      es: "Canjear",
      en: "Exchange",
      pt: "Trocar",
      zh: "-"
    },
    "No tiene las monedas suficientes para realizar este canje, siga jugando para acumular las mismas.": {
      es: "No tiene las monedas suficientes para realizar este canje, siga jugando para acumular las mismas.",
      en: "You do not have enough coins to make this exchange, keep playing to accumulate them.",
      pt: "Você não tem moedas suficientes para fazer essa troca, continue jogando para acumulá-las.",
      zh: "-"
    },
    "Premio en proceso": {
      es: "Premio en proceso",
      en: "Prize in process",
      pt: "Prêmio em processo",
      zh: "-"
    },
    "Su premio está siendo procesado. Se le notificara por mail a": {
      es: "Su premio está siendo procesado. Se le notificara por mail a",
      en: "Your prize is being processed. You are notified by email to",
      pt: "Seu prêmio está sendo processado. Você é notificado por e-mail para",
      zh: "-"
    },
    "cuando este procesado, se le descontaran las monedas equivalentes al premio de su monedero.": {
      es: "cuando este procesado, se le descontaran las monedas equivalentes al premio de su monedero.",
      en: "When this processed, you are discounted the coins equivalent to the prize of your purse.",
      pt: "Quando isso é processado, você é descontado as moedas equivalentes ao prêmio de sua bolsa.",
      zh: "-"
    },
    "Confirme los datos previo a realizar el canje:": {
      es: "Confirme los datos previo a realizar el canje:",
      en: "Confirm the data prior to making the exchange:",
      pt: "Confirme os dados antes de fazer a troca:",
      zh: "-"
    },
    "Precio": {
      es: "Precio",
      en: "Price",
      pt: "Preço",
      zh: "-"
    },
    "Ganá": {
      es: "Ganá",
      en: "Win",
      pt: "Ganhar",
      zh: "-"
    },
    "Los usuarios que se registren con este link, contaran como invitados tuyos": {
      es: "Los usuarios que se registren con este link, contaran como invitados tuyos",
      en: "Users who register with this link, will count as your guests",
      pt: "Os usuários que se inscreverem neste link, contam como seus convidados",
      zh: "-"
    },
    "recomendá 1 amigo.": {
      es: "recomendá 1 amigo.",
      en: "recommend 1 friend.",
      pt: "recomende 1 amigo.",
      zh: "-"
    },
    "O usando estas opciones:": {
      es: "O usando estas opciones:",
      en: "Or using these options:",
      pt: "Ou usando estas opções:",
      zh: "-"
    },
    "Registrados en": {
      es: "Registrados en",
      en: "Registered in",
      pt: "Registrado em",
      zh: "-"
    },
    "Su navegador no soporta la función para copiar automáticamente": {
      es: "Su navegador no soporta la función para copiar automáticamente",
      en: "Your browser does not support the function to automatically copy",
      pt: "Seu navegador não suporta a função para copiar automaticamente",
      zh: "-"
    },
    "Muchas gracias por su recomendación": {
      es: "Muchas gracias por su recomendación",
      en: "Thank you very much for your recommendation",
      pt: "Muito obrigado pela sua recomendação",
      zh: "-"
    },
    "Muchas Gracias": {
      es: "Muchas gracias",
      en: "Thank you very much",
      pt: "Muito obrigado",
      zh: "-"
    },
    "Usuarios Invitados": {
      es: "Usuarios Invitados",
      en: "Invited Users",
      pt: "Usuários convidados",
      zh: "-"
    },
    "Cambiar contraseña": {
      es: "Cambiar contraseña",
      en: "Change Password",
      pt: "Alterar senha",
      zh: "-"
    },
    "Guardar": {
      es: "Guardar",
      en: "Save",
      pt: "Salvar",
      zh: "-"
    },
    "Editar mi información personal": {
      es: "Editar mi información personal",
      en: "Edit my personal information",
      pt: "Edite minhas informações pessoais",
      zh: "-"
    },
    Nombre: {
      es: "Nombre",
      en: "First name",
      pt: "Nome",
      zh: "-"
    },
    Apellido: {
      es: "Apellido",
      en: "Last name",
      pt: "Sobrenome",
      zh: "-"
    },
    "El Campo <b>Nombre</b> es obligatorio": {
      es: "El Campo <b>Nombre</b> es obligatorio",
      en: "The Field <b>First name</b> is required",
      pt: "O campo <b>Nome</b> é necessário",
      zh: "-"
    },
    "El Campo <b>Apellido</b> es obligatorio": {
      es: "El Campo <b>Apellido</b> es obligatorio",
      en: "The Field <b>Last name</b> is required",
      pt: "O campo <b>Sobrenome</b> é necessário",
      zh: "-"
    },
    "Cambios Realizados": {
      es: "Cambios Realizados",
      en: "Changes made",
      pt: "Mudanças feitas",
      zh: "-"
    },
    "Los cambios se realizaron con exito": {
      es: "Los cambios se realizaron con éxito",
      en: "The changes were made successfully",
      pt: "As mudanças foram feitas com sucesso",
      zh: "-"
    },
    "Cambiar contraseña": {
      es: "Cambiar contraseña",
      en: "Change Password",
      pt: "Alterar senha",
      zh: "-"
    },
    "Repetir contraseña": {
      es: "Repetir contraseña",
      en: "Repeat password",
      pt: "Repetir a senha",
      zh: "-"
    },
    "Nueva contraseña": {
      es: "Nueva contraseña",
      en: "New Password",
      pt: "Nova senha",
      zh: "-"
    },
    "Contraseñas distintas": {
      es: "Contraseñas distintas",
      en: "Different passwords",
      pt: "Senhas diferentes",
      zh: "-"
    },
    "La contraseña  y la repetición de la misma deben ser iguales.": {
      es: "La contraseña  y la repetición de la misma deben ser iguales.",
      en: "The password and the repetition thereof must be the same.",
      pt: "A senha e a repetição devem ser iguais.",
      zh: "-"
    },
    "Terminos y Condiciones": {
      es: "Términos y Condiciones",
      en: "Terms and Conditions",
      pt: "Termos e Condições",
      zh: "-"
    },
    "PRIMEROS PASOS": {
      es: "PRIMEROS PASOS",
      en: "FIRST STEPS",
      pt: "PRIMEIROS PASSOS",
      zh: "-"
    },
    "<p>1. Selecciona el partido que quieras Jugar.</p><p>2. Elige la modalidad de juego: PARTIDO AMISTOSO o PARTIDO OFICIAL.</p><p>3. Cliquea el botón JUGAR.</p><p>4. Elige los tres jugadores que crees van a ser los mejores del partido.</p><p>5. Sigue el rendimiento de tus jugadores en VIVO.</p><p>6. El usuario que suma más puntos gana el partido.</p><p>7. Cobra tus premios.</p><p>8. Conviértete en el mejor.</p>": {
      es: "<p>1. Selecciona el partido que quieras Jugar.</p><p>2. Elige la modalidad de juego: PARTIDO AMISTOSO o PARTIDO OFICIAL.</p><p>3. Cliquea el botón JUGAR.</p><p>4. Elige los tres jugadores que crees van a ser los mejores del partido.</p><p>5. Sigue el rendimiento de tus jugadores en VIVO.</p><p>6. El usuario que suma más puntos gana el partido.</p><p>7. Cobra tus premios.</p><p>8. Conviértete en el mejor.</p>",
      en: "<p> 1. Select the match you want to play. </ P> <p> 2. Choose the game mode: FRIENDLY or OFFICIAL. </ P> <p> 3. Click the PLAY button. </ P> <p> 4. Choose the three players that you think will be the best in the game. </ P> <p> 5. Follow the performance of your players LIVE. </ P> <p> 6. The user who adds more points wins the game. </ P> <p> 7. Collect your prizes. </ P> <p> 8. Become the best. </ P>",
      pt: "<p> 1. Selecione a partida que deseja jogar. </ P> <p> 2. Escolha o modo de jogo: AMISTOSO ou OFFICIAL. </ P> <p> 3. Clique no botão PLAY. </ P> <p> 4. Escolha os três jogadores que você acha que serão os melhores no jogo. </ P> <p> 5. Acompanhe o desempenho dos seus jogadores LIVE. </ P> <p> 6. O usuário que adiciona mais pontos ganha o jogo. </ P> <p> 7. Colecione seus prêmios. </ P> <p> 8. Torne-se o melhor. </ P>",
      zh: "-"
    },
    "¿CÓMO CALIFICAMOS?": {
      es: "¿CÓMO CALIFICAMOS?",
      en: "HOW DO WE QUALIFY?",
      pt: "COMO QUALIFICAMOS?",
      zh: "-"
    },
    'Cada acción efectuada por un jugador tiene asociado un puntaje: goles, disparos, pases, recuperaciones, tarjetas, y mucho más! Chequea la tabla de puntuación detallada en la información <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> de cada partido. <br>Obtenemos las acciones en VIVO, a partir de convenios con proveedores de estadística deportiva.': {
      es: 'Cada acción efectuada por un jugador tiene asociado un puntaje: goles, disparos, pases, recuperaciones, tarjetas, y mucho más! Chequea la tabla de puntuación detallada en la información <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> de cada partido. </br>Obtenemos las acciones en VIVO, a partir de convenios con proveedores de estadística deportiva.',
      en: 'Each action carried out by a player has associated a score: goals, shots, passes, recoveries, cards, and much more! Check the scorecard detailed in the information <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> of each match. </ br> We get the shares LIVE, based on agreements with sports statistics providers.',
      pt: 'Cada ação realizada por um jogador associou uma pontuação: objetivos, tiros, passes, recuperações, cartões e muito mais! Verifique o scorecard detalhado na informação <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> de cada partida. </br> Recebemos as ações LIVE, com base em acordos com provedores de estatísticas esportivas.',
      zh: "-"
    },
    "¿QUE GANO?": {
      es: "¿QUE GANÓ?",
      en: "WHAT DO I WON?",
      pt: "O QUE GANHOU?",
      zh: "-"
    },
    "Cada PARTIDO OFICIAL reparte monedas, las cuales puedes canjear en nuestro store por premios reales como pelotas, botines, camisetas, accesorios, y hasta viajes al exterior de tu país!": {
      es: "Cada PARTIDO OFICIAL reparte monedas, las cuales puedes canjear en nuestro store por premios reales como pelotas, botines, camisetas, accesorios, y hasta viajes al exterior de tu país!",
      en: "Each OFFICIAL PARTY distributes coins, which you can exchange in our store for real prizes such as balls, boots, shirts, accessories, and even trips abroad of your country!",
      pt: "Cada JOGO OFICIAL distribui moedas, que você pode trocar em nossa loja por prêmios reais, como bolas, botas, camisas, acessórios e até viagens no exterior do seu país!",
      zh: "-"
    },
    "¿Qué es Jugaplay?": {
      es: "¿Qué es Jugaplay?",
      en: "What is Jugaplay?",
      pt: "O que é Jugaplay?",
      zh: "-"
    },
    'Jugaplay es un juego que premia tus habilidades para seleccionar jugadores de fútbol. Elige los jugadores que crees serán los mejores de la cancha para un determinado partido. Sumas puntos de acuerdo al desempeño de tus jugadores en la vida real y ganas monedas si quedas entre los primeros puestos.<br><br><span class="highlight">¡Estas monedas pueden cambiarse por premios en nuestra <a href="store.html"><img src="img/icons/menu/store.svg" width="15px" style="margin-right: 5px; margin-top: -4px;">Tienda de Premios</a>!</span>': {
      es: 'Jugaplay es un juego que premia tus habilidades para seleccionar jugadores de fútbol. Elige los jugadores que crees serán los mejores de la cancha para un determinado partido. Sumas puntos de acuerdo al desempeño de tus jugadores en la vida real y ganas monedas si quedas entre los primeros puestos.<br><br><span class="highlight">¡Estas monedas pueden cambiarse por premios en nuestra <a href="store.html"><img src="img/icons/menu/store.svg" width="15px" style="margin-right: 5px; margin-top: -4px;">Tienda de Premios</a>!</span>',
      en: 'Jugaplay is a game that rewards your abilities to select soccer players. Choose the players that you think will be the best on the field for a particular game. Win points according to the performance of your players in real life and earn coins if you are among the top positions. <br> <br> <span class = "highlight"> These coins can be exchanged for prizes in our <a href = "store.html"> <img src="img/icons/menu/store.svg" width = "15px" style = "margin-right: 5px; margin-top: -4px;"> Prize Store </ a >! </ span>',
      pt: 'Jugaplay é um jogo que recompensa suas habilidades para selecionar jogadores de futebol. Escolha os jogadores que você acha que serão os melhores no campo para um jogo específico. Adicione pontos de acordo com o desempenho de seus jogadores na vida real e ganhe moedas se você estiver entre as melhores posições. <br> <br> <span class = "highlight"> Estas moedas podem ser trocadas por prêmios em <a href="store.html"> <img src="img/icons/menu/store.svg" width = "15px" style = "margin-right: 5px; margin-top: -4px;"> Prêmio Loja </ a >! </ span>',
      zh: "-"
    },
    "Competición": {
      es: "Competición",
      en: "Competition",
      pt: "Competição",
      zh: "-"
    },
    'La competición sucede exclusivamente entre usuarios de Jugaplay. Se utilizan estadísticas del fútbol real con tablas de puntaje pre-establecidas para cada partido. De esta manera las posibilidades de victoria se mantienen iguales para todos los usuarios. <br><br> Queremos que la competencia sea leal, y que las chances de victoria sean para todos por igual. Somos partidarios de la competencia sana. Si crees que algún usuario está realizando trampa, no dudes en avisarnos. Es importante mantener la transparencia en todo momento. <br><br> Está prohibido el uso de multicuentas. Registramos la ubicación de los ingresos de cada usuario según su IP, y las contrastamos con la selección de jugadores y partidos en los que califica. De esta manera detectamos aquellos patrones que se relacionan con el fraude. <br><br> Cualquier caso de trampa o fraude detectado será procesado por el <span class="highlight">Tribunal de Disciplina de Jugaplay</span>, quien tiene la capacidad de aplicar la sanción correspondiente, pudiendo incluso suspender la cuenta del usuario para siempre. <br><br> <i>Nota: Estamos al tanto de las cuentas en casas familiares que comparten la misma IP. Nuestro algoritmo distingue estos casos sin problemas.</i>': {
      es: 'La competición sucede exclusivamente entre usuarios de Jugaplay. Se utilizan estadísticas del fútbol real con tablas de puntaje pre-establecidas para cada partido. De esta manera las posibilidades de victoria se mantienen iguales para todos los usuarios. <br><br> Queremos que la competencia sea leal, y que las chances de victoria sean para todos por igual. Somos partidarios de la competencia sana. Si crees que algún usuario está realizando trampa, no dudes en avisarnos. Es importante mantener la transparencia en todo momento. <br><br> Está prohibido el uso de multicuentas. Registramos la ubicación de los ingresos de cada usuario según su IP, y las contrastamos con la selección de jugadores y partidos en los que califica. De esta manera detectamos aquellos patrones que se relacionan con el fraude. <br><br> Cualquier caso de trampa o fraude detectado será procesado por el <span class="highlight">Tribunal de Disciplina de Jugaplay</span>, quien tiene la capacidad de aplicar la sanción correspondiente, pudiendo incluso suspender la cuenta del usuario para siempre. <br><br> <i>Nota: Estamos al tanto de las cuentas en casas familiares que comparten la misma IP. Nuestro algoritmo distingue estos casos sin problemas.</i>',
      en: 'The competition happens exclusively among Jugaplay users. Real football statistics are used with scorecards pre-established for each match. In this way the chances of victory remain the same for all users. <br> <br> We want the competition to be fair, and that the chances of victory are for everyone equally. We are in favor of healthy competition. If you think that a user is cheating, do not hesitate to tell us. It is important to maintain transparency at all times. <br> <br> The use of multi-accounts is prohibited. We record the location of each user s income according to their IP, and contrast them with the selection of players and matches in which they qualify. In this way we detect those patterns that are related to fraud. <br> <br> Any case of cheating or fraud detected will be processed by the <span class = "highlight"> Jugaplay Discipline Tribunal </ span>, who has the ability to apply the corresponding sanction, and may even suspend the account of the user forever. <br> <br> <i> Note: We are aware of accounts in family homes that share the same IP. Our algorithm distinguishes these cases without problems. </I>',
      pt: 'A competição acontece exclusivamente entre os usuários do Jugaplay. Estatísticas reais de futebol são usadas com scorecards pré-estabelecidos para cada partida. Desta forma, as chances de vitória continuam a ser as mesmas para todos os usuários. <br> <br> Queremos que a competição seja justa e que as chances de vitória sejam para todos igualmente. Somos a favor de uma concorrência saudável. Se você acha que um usuário está traindo, não hesite em nos contar. É importante manter a transparência em todos os momentos. <br> <br> É proibido o uso de multi-contas. Registramos a localização da renda de cada usuário de acordo com seu IP e contrastamos com a seleção de jogadores e partidas nas quais eles se qualificam. Desta forma, detectamos os padrões relacionados à fraude. <br> <br> Qualquer caso de trapaça ou fraude detectado será processado pelo <span class = "highlight"> Jugaplay Discipline Tribunal </ span>, que tem a capacidade de aplicar a sanção correspondente e pode até suspender a conta do usuário para sempre. <br> <br> <i> Nota: Estamos cientes de contas em casas familiares que compartilham o mesmo IP. Nosso algoritmo distingue esses casos sem problemas. </I>',
      zh: "-"
    },
    "Partidos elegibles": {
      es: "Partidos elegibles",
      en: "Eligible matches",
      pt: "Partidas elegíveis",
      zh: "-"
    },
    "Todos los partidos son elegibles para jugar. La división de torneos y competencias en listas solo es una cuestión visual para facilitar la navegación dada la cantidad de partidos semanales que se juegan.": {
      es: "Todos los partidos son elegibles para jugar. La división de torneos y competencias en listas solo es una cuestión visual para facilitar la navegación dada la cantidad de partidos semanales que se juegan.",
      en: "All matches are eligible to play. The division of tournaments and competitions in lists is only a visual question to facilitate the navigation given the number of weekly games that are played.",
      pt: "Todas as correspondências são elegíveis para jogar. A divisão de torneios e competições em listas é apenas uma questão visual para facilitar a navegação dada a quantidade de jogos semanais que são jogados.",
      zh: "-"
    },
    "Selección de jugadores": {
      es: "Selección de jugadores",
      en: "Selection of players",
      pt: "Seleção de jogadores",
      zh: "-"
    },
    'Para participar de un partido, primero debes seleccionar tres jugadores. La lista que figura para cada equipo contiene tanto titulares como suplentes. Es importante revisar la formación titular en el momento previo al partido, ya que los suplentes no suman puntaje. <br><br> <span class="highlight"><b>IMPORTANTE:</b> Una vez elegidos los jugadores no se podrán hacer cambios.</span>': {
      es: 'Para participar de un partido, primero debes seleccionar tres jugadores. La lista que figura para cada equipo contiene tanto titulares como suplentes. Es importante revisar la formación titular en el momento previo al partido, ya que los suplentes no suman puntaje. <br><br> <span class="highlight"><b>IMPORTANTE:</b> Una vez elegidos los jugadores no se podrán hacer cambios.</span>',
      en: 'To participate in a match, you must first select three players. The list that appears for each team contains both incumbents and substitutes. It is important to review the starting line-up at the time prior to the match, since the substitutes do not add points. <br> <br> <span class = "highlight"> <b> IMPORTANT: </ b> Once the players have been chosen, no changes can be made. </ span>',
      pt: 'Para participar de uma partida, primeiro você deve selecionar três jogadores. A lista que aparece para cada equipe contém tanto os titulares como os substitutos. É importante rever a formação inicial no momento anterior à partida, uma vez que os substitutos não adicionam pontos. <br> <br> <span class = "highlight"> <b> IMPORTANTE: </ b> Uma vez que os jogadores foram escolhidos, nenhuma alteração pode ser feita. </ span>',
      zh: "-"
    },
    "Capitán y Subcapitán": {
      es: "Capitán y Subcapitán",
      en: "Captain and Subcaptain",
      pt: "Capitão e Subcaptain",
      zh: "-"
    },
    "El primer jugador seleccionado quedará automáticamente designado como capitán. El segundo jugador, en tanto, como sub capitán. Estos dos roles se utilizarán únicamente en caso de empatar en puntaje con otro usuario.": {
      es: "El primer jugador seleccionado quedará automáticamente designado como capitán. El segundo jugador, en tanto, como sub capitán. Estos dos roles se utilizarán únicamente en caso de empatar en puntaje con otro usuario.",
      en: "The first selected player will automatically be designated as captain. The second player, meanwhile, as sub captain. These two roles will be used only in case of matching scores with another user.",
      pt: "O primeiro jogador selecionado será automaticamente designado como capitão. O segundo jogador, enquanto isso, como sub capitão. Essas duas funções serão usadas apenas no caso de resultados correspondentes com outro usuário.",
      zh: "-"
    },
    "Acción de un jugador": {
      es: "Acción de un jugador",
      en: "Action of a player",
      pt: "Ação de um jogador",
      zh: "-"
    },
    "Ranking del partido": {
      es: "Ranking del partido",
      en: "Ranking of the match",
      pt: "Ranking da partida",
      zh: "-"
    },
    "Corresponde a la lista completa de usuarios que han seleccionado sus jugadores para el partido. Conforme el partido avanza, se registran las acciones de los jugadores en vivo. Los puntos que consigue cada jugador seleccionado se suman al puntaje final de cada usuario. Al finalizar el partido, se genera una tabla de posiciones ordenada de mayor a menor puntaje.": {
      es: "Corresponde a la lista completa de usuarios que han seleccionado sus jugadores para el partido. Conforme el partido avanza, se registran las acciones de los jugadores en vivo. Los puntos que consigue cada jugador seleccionado se suman al puntaje final de cada usuario. Al finalizar el partido, se genera una tabla de posiciones ordenada de mayor a menor puntaje.",
      en: "Corresponds to the full list of users who have selected their players for the match. As the game progresses, players' actions are recorded live. The points obtained by each selected player are added to the final score of each user. At the end of the match, an ordered table of positions is generated from highest to lowest score.",
      pt: "Corresponde à lista completa de usuários que selecionaram seus jogadores para a partida. À medida que o jogo avança, as ações dos jogadores são gravadas ao vivo. Os pontos obtidos por cada jogador selecionado são adicionados ao resultado final de cada usuário. No final da partida, uma tabela de posições ordenada é gerada do mais alto ao menor.",
      zh: "-"
    },
    'Se considera una acción, a todo evento realizado por un jugador real dentro de un partido utilizando nuestro gestor de estadísticas establecido en los <a href="terms-conditions.html">términos y condiciones</a>. <br><br> Hay tres tipos de acciones: <ul class="rules-list"> <li><span class="highlight"><b>Positivas: </b></span>Aquellas que suman puntos.</li><li><span class="highlight"><b>Negativas: </b></span>Aquellas que restan puntos.</li><li><span class="highlight"><b>Estados: </b></span>Se computan los puntos mientras se mantenga la caracteristica (ej: Valla invicta).</li></ul> Algunas acciones solo aplican si son ejecutadas por el rol correcto. <ul class="rules-list"> <li>Arquero <span class="highlight"><b>(ARQ)</b></span><br></li><li>Defensor <span class="highlight"><b>(DEF)</b></span><br></li><li>Mediocampista <span class="highlight"><b>(MED)</b></span><br></li><li>Delantero <span class="highlight"><b>(DEL)</b></span><br></li></ul>': {
      es: 'Se considera una acción, a todo evento realizado por un jugador real dentro de un partido utilizando nuestro gestor de estadísticas establecido en los <a href="terms-conditions.html">términos y condiciones</a>. <br><br> Hay tres tipos de acciones: <ul class="rules-list"> <li><span class="highlight"><b>Positivas: </b></span>Aquellas que suman puntos.</li><li><span class="highlight"><b>Negativas: </b></span>Aquellas que restan puntos.</li><li><span class="highlight"><b>Estados: </b></span>Se computan los puntos mientras se mantenga la caracteristica (ej: Valla invicta).</li></ul> Algunas acciones solo aplican si son ejecutadas por el rol correcto. <ul class="rules-list"> <li>Arquero <span class="highlight"><b>(ARQ)</b></span><br></li><li>Defensor <span class="highlight"><b>(DEF)</b></span><br></li><li>Mediocampista <span class="highlight"><b>(MED)</b></span><br></li><li>Delantero <span class="highlight"><b>(DEL)</b></span><br></li></ul>',
      en: 'It is considered an action, at all events performed by a real player within a match using our statistics manager established in the <a href="terms-conditions.html"> terms and conditions </a>. <br> <br> There are three types of actions: <ul class = "rules-list"> <li> <span class = "highlight"> <b> Positives: </ b> </ span> Those that add points . </ li> <li> <span class = "highlight"> <b> Negatives: </b> </ span> Those that subtract points. </li> <li> <span class = "highlight"> <b> States: </b> </span> Points are computed as long as the characteristic is maintained (eg: Invicta fence). </ li> </ ul> Some actions only apply if they are executed by the correct role. <ul class = "rules-list"> <li> Goalkeeper <span class = "highlight"> <b> (ARQ) </ b> </ span> <br> </ li> <li> Defender <span class = "highlight"> <b> (DEF) </ b> </ span> <br> </ li> <li> Midfielder <span class = "highlight"> <b> (MED) </b> </ span> <br> </ li> <li> Forward <span class = "highlight"> <b> (DEL) </b> </span> <br> </li> </ul>',
      pt: 'É considerada uma ação, em todos os eventos, realizada por um jogador real dentro de uma partida usando nosso gerente de estatísticas definido nos <a href="terms-conditions.html"> termos e condições </a>. <br> <br> Existem três tipos de ações: <ul class = "rules-list"> <li> <span class = "highlight"> <b> Positivos: </ b> </ span> Aqueles que adicionam pontos . </li> <li> <span class = "highlight"> <b> Negativos: </ b> </ span> Aqueles que subtraem pontos. </li> <li> <span class = "highlight"> <b> Estados: </b> </span> Os pontos são calculados desde que a característica seja mantida (por exemplo: cerca Invicta). </ li> </ ul> Algumas ações só se aplicam se forem executadas pela função correta. <ul class = "rules-list"> <li> Goleiro <span class = "highlight"> <b> (ARQ) </ b> </ span> <br> </ li> <li> Defender <span class = "destaque"> <b> (DEF) </b> </ pan> <br> </li> <li> Médio <span class = "highlight"> <b> (MED) </b> </span> <br> </li> <li> Encaminhar <span class = "highlight"> <b> (DEL) </b> </span> <br> </li> </ul>',
      zh: "-"
    },
    "Partido en vivo": {
      es: "Partido en vivo",
      en: "Live match",
      pt: "Partida ao vivo",
      zh: "-"
    },
    'Mientras el partido se está jugando, las acciones y el ranking se actualizan en tiempo real. Se pueden ver los cambios de posición, así como los puntajes acumulados de cada jugador. Solo durante el partido en vivo se pueden ver los jugadores seleccionados por otros usuarios. <br><br> <span class="highlight"><b>CONSEJO:</b></span> Una estrategia importante a la hora de competir en futuros partidos, es conocer y aprender de tus rivales. Revisa las elecciones de los usuarios ganadores, aprende sobre los jugadores que suman mayor puntaje, observa qué acciones los colocan en los mejores puestos. Elabora tu propia estrategia en base a este conocimiento adquirido.': {
      es: 'Mientras el partido se está jugando, las acciones y el ranking se actualizan en tiempo real. Se pueden ver los cambios de posición, así como los puntajes acumulados de cada jugador. Solo durante el partido en vivo se pueden ver los jugadores seleccionados por otros usuarios. <br><br> <span class="highlight"><b>CONSEJO:</b></span> Una estrategia importante a la hora de competir en futuros partidos, es conocer y aprender de tus rivales. Revisa las elecciones de los usuarios ganadores, aprende sobre los jugadores que suman mayor puntaje, observa qué acciones los colocan en los mejores puestos. Elabora tu propia estrategia en base a este conocimiento adquirido.',
      en: 'While the game is being played, the actions and the ranking are updated in real time. You can see the position changes, as well as the accumulated scores of each player. Only during the live match you can see the players selected by other users. <br> <br> <span class = "highlight"> <b> TIP: </ b> </ span> An important strategy when competing in future matches is to know and learn from your rivals. Review the choices of the winning users, learn about the players that add the highest score, observe what actions place them in the best positions. Develop your own strategy based on this acquired knowledge.',
      pt: 'Enquanto o jogo está sendo jogado, as ações e o ranking são atualizados em tempo real. Você pode ver as mudanças de posição, bem como as pontuações acumuladas de cada jogador. Somente durante a partida ao vivo, você pode ver os jogadores selecionados por outros usuários. <br> <br> <span class = "highlight"> <b> TIP: </ b> </ span> Uma estratégia importante ao competir nas futuras combinações é conhecer e aprender com seus rivais. Reveja as escolhas dos usuários vencedores, saiba mais sobre os jogadores que adicionam a pontuação mais alta, observe quais ações as colocam nas melhores posições. Desenvolva sua própria estratégia com base nesse conhecimento adquirido.',
      zh: "-"
    },
    "Desempate": {
      es: "Desempate",
      en: "Tie-breaker",
      pt: "Tie Breaker",
      zh: "-"
    },
    "En caso de que dos usuarios posean la misma cantidad de puntos, se utilizan los roles de capitán y subcapitán de sus jugadores seleccionados para efectuar el desempate. El capitán que posea mayor puntaje otorga una mejor posición al usuario. El subcapitán se utiliza en caso de que los capitanes empaten en puntos. Y si se da la situación de que tanto el capitán como el subcapitán comparten los mismos puntos, se considera a ambos jugadores en el mismo puesto.": {
      es: "En caso de que dos usuarios posean la misma cantidad de puntos, se utilizan los roles de capitán y subcapitán de sus jugadores seleccionados para efectuar el desempate. El capitán que posea mayor puntaje otorga una mejor posición al usuario. El subcapitán se utiliza en caso de que los capitanes empaten en puntos. Y si se da la situación de que tanto el capitán como el subcapitán comparten los mismos puntos, se considera a ambos jugadores en el mismo puesto.",
      en: "In case two users have the same number of points, the roles of captain and subcaptain of their selected players are used to effect the jump-off. The captain with the highest score gives the user a better position. The subcaptain is used in case the captains tie in points. And if the situation arises that both the captain and the subcaptain share the same points, both players are considered in the same position.",
      pt: "No caso de dois usuários terem o mesmo número de pontos, os papéis de capitão e subconjugação de seus jogadores selecionados são usados para efetuar o salto. O capitão com maior pontuação dá ao usuário uma posição melhor. A subcapacidade é usada caso os capitães estejam em pontos. E se surgir a situação de que o capitão e a subcaptabilidade compartilham os mesmos pontos, ambos os jogadores são considerados na mesma posição.",
      zh: "-"
    },
    "Ganador y Premios": {
      es: "Ganador y Premios",
      en: "Winner and Awards",
      pt: "Vencedor e Prêmios",
      zh: "-"
    },
    "Cada partido posee un pozo acumulado de premios que se distribuye entre los primeros puestos. A mayor pozo, mayor cantidad de usuarios recibe premios. Es importante revisar la tabla de premiación al momento de anotarse en un partido, ya que varía según el partido.": {
      es: "Cada partido posee un pozo acumulado de premios que se distribuye entre los primeros puestos. A mayor pozo, mayor cantidad de usuarios recibe premios. Es importante revisar la tabla de premiación al momento de anotarse en un partido, ya que varía según el partido.",
      en: "Each game has an accumulated prize pool that is distributed among the first places. The larger the well, the more users receive prizes. It is important to review the award table when registering in a match, as it varies according to the match.",
      pt: "Cada jogo tem um prize pool acumulado que é distribuído entre os primeiros lugares. Quanto maior o poço, mais usuários receberam prêmios. É importante rever a tabela de premiação quando se registra em uma partida, pois varia de acordo com a partida.",
      zh: "-"
    },
    "Modalidades de juego": {
      es: "Modalidades de juego",
      en: "Modalities of game",
      pt: "Modalidades de jogo",
      zh: "-"
    },
    'Las modalidades de juego utilizan el mismo sistema de puntaje de partidos. La diferencia radica en el impacto que tiene el resultado del partido en los premios, costos de ingreso y tablas de posiciones. A continuación se describen en detalle cada modalidad. <br><br> <span class="highlight"><b>IMPORTANTE:</b> Sólo puedes jugar los partidos en una única modalidad. ¡Elige bien!</span>': {
      es: 'Las modalidades de juego utilizan el mismo sistema de puntaje de partidos. La diferencia radica en el impacto que tiene el resultado del partido en los premios, costos de ingreso y tablas de posiciones. A continuación se describen en detalle cada modalidad. <br><br> <span class="highlight"><b>IMPORTANTE:</b> Sólo puedes jugar los partidos en una única modalidad. ¡Elige bien!</span>',
      en: 'As modalidades do jogo usam o mesmo sistema de pontuação de correspondência. A diferença reside no impacto que o resultado do jogo tem nos prêmios, custos de entrada e tabelas de posição. Em seguida, cada modalidade é descrita em detalhes. <br> <br> <span class = "highlight"> <b> IMPORTANTE: </ b> Você só pode jogar jogos em um único modo. Escolha bem! </ Span>',
      pt: 'The game modalities use the same match scoring system. The difference lies in the impact that the result of the game has on the prizes, entry costs and position tables. Next, each modality is described in detail. <br> <br> <span class = "highlight"> <b> IMPORTANT: </ b> You can only play games in a single mode. Choose well! </ Span>',
      zh: "-"
    },
    'No posee costo de entrada. Es gratis. El premio es de fichas y gana el 50% de los usuarios anotados en el partido con mayor puntaje. Es decir, la mitad mejor posicionada al finalizar el partido. La cantidad de fichas que se otorgan como premio son distintas para cada partido. <br><br> <span class="highlight"><b>CONSEJO:</b></span> Esta modalidad se utiliza para adquirir conocimiento sobre equipos que no conoces, sin recibir un impacto negativo en tu economía. Además, el premio en fichas te da acceso a partidos “Oficiales”. <span class="highlight">¡Juega todos los partidos Amistosos que puedas!</span>': {
      es: 'No posee costo de entrada. Es gratis. El premio es de fichas y gana el 50% de los usuarios anotados en el partido con mayor puntaje. Es decir, la mitad mejor posicionada al finalizar el partido. La cantidad de fichas que se otorgan como premio son distintas para cada partido. <br><br> <span class="highlight"><b>CONSEJO:</b></span> Esta modalidad se utiliza para adquirir conocimiento sobre equipos que no conoces, sin recibir un impacto negativo en tu economía. Además, el premio en fichas te da acceso a partidos “Oficiales”. <span class="highlight">¡Juega todos los partidos Amistosos que puedas!</span>',
      en: 'It has no entry cost. It s free. The prize is for chips and 50% of the users scored in the highest scoring match wins. That is, the half better positioned at the end of the game. The amount of chips that are awarded as a prize are different for each game. <br> <br> <span class = "highlight"> <b> TIP: </ b> </ span> This mode is used to acquire knowledge about equipment that you do not know, without receiving a negative impact on your economy. In addition, the prize in chips gives you access to "Official" matches. <span class = "highlight"> Play as many friendly matches as you can! </ span>',
      pt: 'Não tem custo de entrada. É grátis. O prêmio é para fichas e 50% dos usuários marcados no jogo com a maior pontuação ganha. Ou seja, a metade melhor posicionada no final do jogo. A quantidade de chips que são premiados como prêmio são diferentes para cada jogo. <br> <span class = "highlight"> <b> TIP: </ b> </ span> Este modo é usado para adquirir conhecimento sobre equipamentos que você não conhece, sem ter um impacto negativo na sua economia. Além disso, o prêmio em fichas dá acesso a partidas "oficiais". <span class = "highlight"> Jogue tantas combinações amigáveis quanto você puder! </span>',
      zh: "-"
    },
    'El partido Oficial tiene un costo de entrada en fichas. Los puntos obtenidos en esta modalidad se utilizan para posicionar en la <a href="league.html">Liga Jugaplay</a>. Otorga un premio en monedas, las cuales son utilizadas en la tienda para canjear por premios reales. La tabla de pago varía según el partido. <br><br> <span class="highlight"><b>MULTIPLICADOR <img src="img/icons/coins/x2.png" style="height: 16px; margin-top: -3px;">:</b></span> En esta modalidad se encuentra disponible el multiplicador de monedas. Tiene un costo en fichas, y solo aplica para el partido seleccionado. Duplica el premio en monedas... ¡si es que lo consigues!.': {
      es: 'El partido Oficial tiene un costo de entrada en fichas. Los puntos obtenidos en esta modalidad se utilizan para posicionar en la <a href="league.html">Liga Jugaplay</a>. Otorga un premio en monedas, las cuales son utilizadas en la tienda para canjear por premios reales. La tabla de pago varía según el partido. <br><br> <span class="highlight"><b>MULTIPLICADOR <img src="img/icons/coins/x2.png" style="height: 16px; margin-top: -3px;">:</b></span> En esta modalidad se encuentra disponible el multiplicador de monedas. Tiene un costo en fichas, y solo aplica para el partido seleccionado. Duplica el premio en monedas... ¡si es que lo consigues!.',
      en: 'The Official match has a cost of entry in chips. The points obtained in this modality are used to position in the <a href="league.html"> Liga Jugaplay </a>. It awards a prize in coins, which are used in the store to exchange for real prizes. The payment table varies according to the match. <br> <br> <span class = "highlight"> <b> MULTIPLIER <img src = "img/icons/coins/x2.png" style = "height: 16px; margin-top: -3px;">: </ b> </ span> In this mode, the coin multiplier is available. It has a cost in chips, and only applies to the selected game. Double the prize in coins ... if you get it!',
      pt: 'A partida oficial tem um custo de entrada em fichas. Os pontos obtidos nesta modalidade são usados para posicionar na <a href="league.html"> Liga Jugaplay </a>. Ele premia um prêmio em moedas, que são usadas na loja para trocar por prêmios reais. A tabela de pagamento varia de acordo com a partida. <br> <br> <span class = "highlight"> <b> MULTIPLADOR <img src = "img/icons/coins/x2.png" style = "height: 16px; margin-top: -3px;">: </ b> </ span> Neste modo, o multiplicador de moeda está disponível. Tem um custo em chips, e só se aplica ao jogo selecionado. Dobre o prêmio em moedas ... se você obtê-lo!',
      zh: "-"
    },
    "La Liga es una competencia que utiliza los puntajes de los partidos Oficiales para elegir al mejor usuario de Jugaplay. Para convertirte en el campeón de la liga debes sumar la mayor cantidad de puntos.": {
      es: "La Liga es una competencia que utiliza los puntajes de los partidos Oficiales para elegir al mejor usuario de Jugaplay. Para convertirte en el campeón de la liga debes sumar la mayor cantidad de puntos.",
      en: "The League is a competition that uses the scores of official matches to choose the best user of Jugaplay. To become the champion of the league you must add the most points.",
      pt: "A Liga é uma competição que usa as partidas de partidas oficiais para escolher o melhor usuário do Jugaplay. Para se tornar o campeão da liga, você deve adicionar mais pontos.",
      zh: "-"
    },
    "Fecha de Liga": {
      es: "Fecha de Liga",
      en: "Date of League",
      pt: "Data da Liga",
      zh: "-"
    },
    "Se considera una fecha a la ventana temporal de una semana. Comienza y cierra los días Lunes. Todos los partidos Oficiales comenzados en la semana son considerados para la fecha en curso.": {
      es: "Se considera una fecha a la ventana temporal de una semana. Comienza y cierra los días Lunes. Todos los partidos Oficiales comenzados en la semana son considerados para la fecha en curso.",
      en: "It is considered a date to the temporary window of a week. Start and close the days Monday. All official matches started in the week are considered for the current date. It is considered a date for a week's temporary janela. Come and date the second-day days. All jogos officiais initiated during the week are considered for the current date.",
      pt: "É considerada uma data para a janela temporária de uma semana. Comece e feche os dias de segunda-feira. Todos os jogos oficiais iniciados na semana são considerados para a data atual.",
      zh: "-"
    },
    "Puntaje de la fecha": {
      es: "Puntaje de la fecha",
      en: "Date score",
      pt: "Pontuação da data",
      zh: "-"
    },
    'El puntaje de la Liga corresponde a la sumatoria de los puntos obtenidos en cada Fecha. Se toman los dos partidos Oficiales de mejor puntaje jugados por el usuario durante la Fecha. Se pueden jugar todos los partidos Oficiales que quieras. Solo los dos mejores puntajes son tenidos en cuenta. <br> Por ejemplo: <ul class="rules-list"> <li>(1) Independiente vs San Lorenzo: <b>124 pts</b></li><li>(2) Lanús vs T. Strongest: <b>64 pts</b></li><li>(3) Botafogo vs Barcelona: <b>86 pts</b></li><li><b class="highlight">Total de fecha:</b> (1) + (3)=124 pts + 86 pts=<b class="highlight">210 pts</b></li></ul>': {
      es: 'El puntaje de la Liga corresponde a la sumatoria de los puntos obtenidos en cada Fecha. Se toman los dos partidos Oficiales de mejor puntaje jugados por el usuario durante la Fecha. Se pueden jugar todos los partidos Oficiales que quieras. Solo los dos mejores puntajes son tenidos en cuenta. <br> Por ejemplo: <ul class="rules-list"> <li>(1) Independiente vs San Lorenzo: <b>124 pts</b></li><li>(2) Lanús vs T. Strongest: <b>64 pts</b></li><li>(3) Botafogo vs Barcelona: <b>86 pts</b></li><li><b class="highlight">Total de fecha:</b> (1) + (3)=124 pts + 86 pts=<b class="highlight">210 pts</b></li></ul>',
      en: 'The score of the League corresponds to the sum of the points obtained on each Date. The two highest scoring Official matches played by the user during the Date are taken. You can play all the official matches you want. Only the two best scores are taken into account. <br> For example: <ul class = "rules-list"> <li> (1) Independent vs. San Lorenzo: <b> 124 pts </ b> </ li> <li> (2) Lanús vs. T. Strongest: <b> 64 pts </ b> </ li> <li> (3) Botafogo vs Barcelona: <b> 86 pts </ b> </ li> <li> <b class = "highlight"> Total Date: </ b> (1) + (3) = 124 pts + 86 pts = <b class = "highlight"> 210 pts </ b> </ li> </ ul>',
      pt: 'A pontuação da liga corresponde à soma dos pontos obtidos em cada data. Os dois jogos oficiais de pontuação mais altos jogados pelo usuário durante a Data são aceitos. Você pode jogar todas as partidas oficiais que deseja. Apenas as duas melhores pontuações são levadas em consideração. Por exemplo: <ul class = "rules-list"> <li> (1) Independente vs. San Lorenzo: <b> 124 pts </ b> </ li> <li> (2) Lanús vs. T. Mais forte: <b> 64 pts </ b> </ li> <li> (3) Botafogo vs Barcelona: <b> 86 pts </ b> </ li> <li> <b class = "highlight"> Total Data: </ b> (1) + (3) = 124 pts + 86 pts = <b class = "highlight"> 210 pts </ b> </ li> </ ul>',
      zh: "-"
    },
    "Duración de la Liga": {
      es: "Duración de la Liga",
      en: "Duration of the League",
      pt: "Duração da Liga",
      zh: "-"
    },
    'Las ligas tienen una día de inicio y un día de cierre. Ambos días estan incluidos en la computación de partidos. Luego se calculan la cantidad de fechas tomando los lunes como comienzo de cada una. Chequea siempre el <a href="league.html">detalle de la Liga</a> para concer el período actual.': {
      es: 'Las ligas tienen una día de inicio y un día de cierre. Ambos días estan incluidos en la computación de partidos. Luego se calculan la cantidad de fechas tomando los lunes como comienzo de cada una. Chequea siempre el <a href="league.html">detalle de la Liga</a> para concer el período actual.',
      en: 'The leagues have a start day and a closing day. Both days are included in the computer games. Then the number of dates is calculated by taking the Monday as the beginning of each. Always check the <a href="league.html"> League detail </a> to find out the current period.',
      pt: 'As ligas têm um dia de início e um dia de encerramento. Ambos os dias estão incluídos nos jogos de computador. Então, o número de datas é calculado tomando a segunda-feira como o início de cada uma. Verifique sempre o <a href="league.html"> detalhe da liga </a> para descobrir o período atual.',
      zh: "-"
    },
    "Premiación de la Liga": {
      es: "Premiación de la Liga",
      en: "Award of the League",
      pt: "Prêmio da Liga",
      zh: "-"
    },
    'Los premios se establecen particularmente para cada Liga. No hay un criterio fijo establecido. Chequea el <a href="league.html">detalle de la Liga</a> para conocer cuál es el premio del mes.': {
      es: 'Los premios se establecen particularmente para cada Liga. No hay un criterio fijo establecido. Chequea el <a href="league.html">detalle de la Liga</a> para conocer cuál es el premio del mes.',
      en: 'The prizes are established particularly for each League. There is no fixed criterion established. Check the <a href="league.html"> League detail </a> to find out what the prize of the month is.',
      pt: 'Os prêmios são estabelecidos especialmente para cada Liga. Não existe um critério fixo estabelecido. Verifique o <a href="league.html"> detalhe da liga </a> para descobrir qual é o prêmio do mês.',
      zh: "-"
    },
    "Canjes en la tienda": {
      es: "Canjes en la tienda",
      en: "Exchange in the store",
      pt: "Troca na loja",
      zh: "-"
    },
    'Tanto en los partidos Oficiales como en las Ligas se otorgan premios en Monedas. Estas pueden utilizarse para realizar canjes reales en la <a href="store.html"><img src="img/icons/menu/store.svg" width="15px" style="margin-right: 5px; margin-top: -4px;">Tienda de Premios</a>. Los premios disponibles son actualizados constantemente, por lo que te recomendamos revisar la tienda regularmente. Una vez realizado el canje, el <span class="highlight">Staff de Jugaplay se pondrá en contacto contigo para coordinar la entrega</span>. <br><br> <b class="highlight">IMPORTANTE:</b> El staff de Jugaplay utilizará los medios oficiales o los medios privados que tú hayas configurado para comunicarse contigo. En ningún momento te pedirá tu usuario o contraseña. Te recomendamos revisar los Términos y condiciones y las Políticas de privacidad antes de realizar un canje. <br><br> ¡Mucha suerte.. y a ganar!': {
      es: 'Tanto en los partidos Oficiales como en las Ligas se otorgan premios en Monedas. Estas pueden utilizarse para realizar canjes reales en la <a href="store.html"><img src="img/icons/menu/store.svg" width="15px" style="margin-right: 5px; margin-top: -4px;">Tienda de Premios</a>. Los premios disponibles son actualizados constantemente, por lo que te recomendamos revisar la tienda regularmente. Una vez realizado el canje, el <span class="highlight">Staff de Jugaplay se pondrá en contacto contigo para coordinar la entrega</span>. <br><br> <b class="highlight">IMPORTANTE:</b> El staff de Jugaplay utilizará los medios oficiales o los medios privados que tú hayas configurado para comunicarse contigo. En ningún momento te pedirá tu usuario o contraseña. Te recomendamos revisar los Términos y condiciones y las Políticas de privacidad antes de realizar un canje. <br><br> ¡Mucha suerte.. y a ganar!',
      en: 'Both in the Official matches and in the Leagues, prizes are awarded in Coins. These can be used to make real redemptions in the <a href="store.html"> <img src="img/icons/menu/store.svg" width = "15px" style = "margin-right: 5px; margin- top: -4px; "> Shop of Awards </a>. The available prizes are constantly updated, so we recommend you check the store regularly. Once the exchange is made, the <span class = "highlight"> Jugaplay Staff will contact you to coordinate the delivery </ span>. <br> <br> <b class = "highlight"> IMPORTANT: </ b> The Jugaplay staff will use the official media or private media that you have set up to communicate with you. At no time will you ask for your username or password. We recommend you to review the Terms and Conditions and the Privacy Policies before making a redemption. <br> <br> Good luck ... and win!',
      pt: 'Tanto nas partidas Oficiais como nas Ligas, os prêmios são premiados em moedas. Estes podem ser usados para fazer resgates reais no <a href="store.html"> <img src="img/icons/menu/store.svg" width = "15px" style = "margin-right: 5px; margin- topo: -4px; "> Loja de Prêmios </a>. Os prêmios disponíveis são constantemente atualizados, por isso recomendamos que você verifique regularmente a loja. Uma vez que a troca é feita, o <span class = "highlight"> Jugaplay Staff entrará em contato com você para coordenar a entrega </ span>. <br> <br> <b class = "highlight"> IMPORTANTE: </ b> A equipe do Jugaplay usará a mídia oficial ou a mídia privada que você configurou para se comunicar com você. Em nenhum momento você pedirá seu nome de usuário ou senha. Recomendamos que você analise os Termos e Condições e as Políticas de Privacidade antes de redigir. <br> <br> Boa sorte ... e vencer!',
      zh: "-"
    },
    "¿COMO SE JUEGA?": {
      es: "¿COMO SE JUEGA?",
      en: "HOW ITS PLAY?",
      pt: "COMO SE JOGA?",
      zh: "-"
    },
    'Es muy fácil. Jugaplay es un juego que premia tus habilidades para seleccionar jugadores de fútbol. Elige los jugadores que crees serán los mejores de la cancha para un determinado partido. Sumas puntos de acuerdo al desempeño de tus jugadores en vida real y ganas monedas si quedas entre los primeros puestos. ¡Estas monedas pueden cambiarse por premios!<br>Te recomendamos leer el <a href="tables-scores.html">Reglamento </a> para conocer los detalles del juego.': {
      es: 'Es muy fácil. Jugaplay es un juego que premia tus habilidades para seleccionar jugadores de fútbol. Elige los jugadores que crees serán los mejores de la cancha para un determinado partido. Sumas puntos de acuerdo al desempeño de tus jugadores en vida real y ganas monedas si quedas entre los primeros puestos. ¡Estas monedas pueden cambiarse por premios!<br>Te recomendamos leer el <a href="tables-scores.html">Reglamento </a> para conocer los detalles del juego.',
      en: 'Too easy. Jugaplay is a game that rewards your abilities to select soccer players. Choose the players that you think will be the best on the field for a particular game. You add points according to the performance of your players in real life and earn coins if you are among the first places. These coins can be exchanged for prizes! <br> We recommend you read the <a href="tables-scores.html"> Regulations </a> to know the details of the game.',
      pt: 'É muito fácil. Jugaplay é um jogo que recompensa suas habilidades para selecionar jogadores de futebol. Escolha os jogadores que você acha que serão os melhores no campo para um jogo específico. Você adiciona pontos de acordo com o desempenho de seus jogadores na vida real e ganha moedas se você estiver entre os primeiros lugares. Essas moedas podem ser trocadas por prêmios! <br> Recomendamos que você leia os <a href="tables-scores.html"> Regulamentos </a> para conhecer os detalhes do jogo.',
      zh: "-"
    },
    "¿QUIENES PUEDEN JUGAR?": {
      es: "¿QUIENES PUEDEN JUGAR?",
      en: "WHO CAN PLAY?",
      pt: "QUEM PODE JOGAR?",
      zh: "-"
    },
    "Jugaplay es un juego de fútbol fantasía gratuito en el que pueden participar usuarios mayores de 6 (seis) años": {
      es: "Jugaplay es un juego de fútbol fantasía gratuito en el que pueden participar usuarios mayores de 6 (seis) años",
      en: "Jugaplay is a free fantasy football game in which users over 6 (six) years old can participate",
      pt: "Jugaplay é um jogo de futebol gratuito de fantasia em que usuários com mais de 6 (seis) anos de idade podem participar",
      zh: "-"
    },
    "¿DONDE VEO LAS ESTADÍSTICAS EVALUADAS?": {
      es: "¿DONDE VEO LAS ESTADÍSTICAS EVALUADAS?",
      en: "WHERE DO I SEE THE EVALUATED STATISTICS?",
      pt: "ONDE POSSO VER AS ESTATÍSTICAS AVALIADAS?",
      zh: "-"
    },
    'Para conocer la forma de puntuar chequea la tabla de puntuación detallada en la información <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> de cada partido. Al finalizar una jugada, se anunciará en el megáfono el resultado. Puedes ver el detalle ingresando al historial de partidos.': {
      es: 'Para conocer la forma de puntuar chequea la tabla de puntuación detallada en la información <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i> de cada partido. Al finalizar una jugada, se anunciará en el megáfono el resultado. Puedes ver el detalle ingresando al historial de partidos.',
      en: 'To know how to score check the detailed score table in the information <i class = "fa fa-info-circle fa-2x" aria-hidden = "true"></i> of each match. At the end of a play, the result will be announced on the megaphone. You can see the detail by entering the match history.',
      pt: 'Para saber como marcar, verifique a tabela de pontuação detalhada na informação <i class = "fa fa-info-circle fa-2x" aria-hidden = "true"></i> de cada partida. No final de uma peça, o resultado será anunciado no megafone. Você pode ver o detalhe digitando o histórico de correspondência.',
      zh: "-"
    },
    "¿LAS ESTADÍSTICAS SON REALES?": {
      es: "¿LAS ESTADÍSTICAS SON REALES?",
      en: "ARE THE STATISTICS REAL?",
      pt: "AS ESTATÍSTICAS SÃO REAIS?",
      zh: "-"
    },
    "Un equipo de profesionales especializados en estadística deportiva nos brinda datos específicos sobre el desempeño de cada jugador titular durante los 90 minutos de juego. Una vez procesada esta información, nuestro sistema asigna los puntos mencionados previamente a cada acción de juego ejecutada por el jugador durante el partido. Ejemplos: Goles, pases correctos, pases incorrectos, infracciones, tarjetas.": {
      es: "Un equipo de profesionales especializados en estadística deportiva nos brinda datos específicos sobre el desempeño de cada jugador titular durante los 90 minutos de juego. Una vez procesada esta información, nuestro sistema asigna los puntos mencionados previamente a cada acción de juego ejecutada por el jugador durante el partido. Ejemplos: Goles, pases correctos, pases incorrectos, infracciones, tarjetas.",
      en: "A team of professionals specialized in sports statistics gives us specific data on the performance of each player during the 90 minutes of play. Once this information is processed, our system assigns the points mentioned previously to each game action executed by the player during the match. Examples: Goals, correct passes, incorrect passes, infractions, cards.",
      pt: "Uma equipe de profissionais especializados em estatísticas esportivas nos fornece dados específicos sobre o desempenho de cada jogador durante os 90 minutos de jogo. Uma vez que esta informação é processada, nosso sistema atribui os pontos mencionados anteriormente a cada ação do jogo executada pelo jogador durante a partida. Exemplos: Objetivos, passes corretos, passagens incorretas, infrações, cartões.",
      zh: "-"
    },
    "¿DÓNDE PUEDO VER LOS PUNTAJES DE MIS JUGADORES?": {
      es: "¿DÓNDE PUEDO VER LOS PUNTAJES DE MIS JUGADORES?",
      en: "WHERE CAN I SEE THE SCORES OF MY PLAYERS?",
      pt: "ONDE POSSO VER OS PONTOS DOS MEUS JOGADORES?",
      zh: "-"
    },
    "Durante los partidos, puedes seguir tu puntaje minuto a minuto en el sector PARTIDOS EN VIVO. Una vez finalizado el partido, puedes encontrar tu puntaje final dentro del sector HISTORIAL.": {
      es: "Durante los partidos, puedes seguir tu puntaje minuto a minuto en el sector PARTIDOS EN VIVO. Una vez finalizado el partido, puedes encontrar tu puntaje final dentro del sector HISTORIAL.",
      en: "During matches, you can track your score minute by minute in the LIVE PARTIES sector. Once the match is over, you can find your final score within the HISTORY sector.",
      pt: "Durante as partidas, você pode acompanhar sua pontuação minuto a minuto no setor LIVE PARES. Uma vez terminada a partida, você pode encontrar o seu resultado final no setor HISTÓRICO.",
      zh: "-"
    },
    "¿CÓMO RECIBO MI PREMIO?": {
      es: "¿CÓMO RECIBO MI PREMIO?",
      en: "HOW DO I RECEIVE MY PRIZE?",
      pt: "COMO EU RECEBO MEU PRÊMIO?",
      zh: "-"
    },
    "Si finalizas entre los mejores de un PARTIDO OFICIAL,  te acreditamos monedas a tu cuenta automáticamente. Estas monedas son canjeables por el premio que más te guste en nuestra tienda. Una vez iniciado el canje, el Staff de Jugaplay se pondrá en contacto directo contigo para efectuar la entrega.": {
      es: "Si finalizas entre los mejores de un PARTIDO OFICIAL,  te acreditamos monedas a tu cuenta automáticamente. Estas monedas son canjeables por el premio que más te guste en nuestra tienda. Una vez iniciado el canje, el Staff de Jugaplay se pondrá en contacto directo contigo para efectuar la entrega.",
      en: "If you end up among the best of an OFFICIAL PARTY, we credit your account automatically. These coins are exchangeable for the prize that you like most in our store. Once the exchange has started, the Jugaplay Staff will contact you directly to make the delivery.",
      pt: "Se você terminar entre os melhores de um FESTIVO, credenciamos sua conta automaticamente. Essas moedas são intercambiáveis pelo prêmio que você mais gosta em nossa loja. Uma vez que a troca tenha começado, o Jugaplay Staff contatá-lo-á diretamente para fazer a entrega.",
      zh: "-"
    },
    "¿QUIENES GANAN MONEDAS EN EL PARTIDO OFICIAL?": {
      es: "¿QUIENES GANAN MONEDAS EN EL PARTIDO OFICIAL?",
      en: "WHO WINS COINS IN THE OFFICIAL PARTY?",
      pt: "QUEM GANHA MOEDAS NA FUNÇÃO?",
      zh: "-"
    },
    "Los usuarios cuyos tres jugadores combinados suman las puntuaciones más altas. Cada partido reparte un pozo acumulado de monedas. Al  finalizar los 90 minutos de juego cierra la tabla de posiciones de los usuarios, indicando quienes fueron los ganadores. ¡Chequea la tabla de pago antes de inscribirte para conocer tus posibilidades!": {
      es: "Los usuarios cuyos tres jugadores combinados suman las puntuaciones más altas. Cada partido reparte un pozo acumulado de monedas. Al  finalizar los 90 minutos de juego cierra la tabla de posiciones de los usuarios, indicando quienes fueron los ganadores. ¡Chequea la tabla de pago antes de inscribirte para conocer tus posibilidades!",
      en: "The users whose three players combined add the highest scores. Each game distributes an accumulated pot of coins. At the end of the 90 minutes of play closes the table of positions of the users, indicating who were the winners. Check the payment table before registering to know your possibilities!",
      pt: "Os usuários cujos três jogadores combinados adicionaram os melhores resultados. Cada jogo distribui um pote acumulado de moedas. No final dos 90 minutos de jogo, fecha a tabela de posições dos usuários, indicando quem foram os vencedores. Verifique a tabela de pagamentos antes de se registrar para conhecer suas possibilidades!",
      zh: "-"
    },
    "¿PARA QUE ME SIRVEN LAS FICHAS?": {
      es: "¿PARA QUE ME SIRVEN LAS FICHAS?",
      en: "WHAT DOES THE FILES SERVE ME?",
      pt: "O QUE OS ARQUIVOS ME SERVEM?",
      zh: "-"
    },
    "Las fichas se utilizan para pagar el acceso a un Partido Oficial, o para comprar el multiplicador de monedas en Partidos Oficiales.": {
      es: "Las fichas se utilizan para pagar el acceso a un Partido Oficial, o para comprar el multiplicador de monedas en Partidos Oficiales.",
      en: "Tokens are used to pay for access to an Official Match, or to buy the coin multiplier in Official Matches.",
      pt: "Os tokens são usados para pagar o acesso a uma Partida Oficial, ou para comprar o multiplicador de moedas nos Jogos Oficiais.",
      zh: "-"
    },
    "¿PUEDO JUGAR UN PARTIDO EN MODO AMISTOSO Y OFICIAL A LA VEZ?": {
      es: "¿PUEDO JUGAR UN PARTIDO EN MODO AMISTOSO Y OFICIAL A LA VEZ?",
      en: "CAN I PLAY A MATCH IN FRIENDLY AND OFFICIAL MODE AT THE SAME TIME?",
      pt: "POSSO JOGAR UM PARTIDO COM MODO AMIGÁVEL E OFICIAL AO MESMO TEMPO?",
      zh: "-"
    },
    "No. Solo podrás elegir una modalidad por partido. Una vez elegida no puedes cambiar de parecer.": {
      es: "No. Solo podrás elegir una modalidad por partido. Una vez elegida no puedes cambiar de parecer.",
      en: "No. You can only choose one mode per game. Once chosen, you can not change your mind.",
      pt: "Não. Você só pode escolher um modo por jogo. Uma vez escolhido, você não pode mudar de idéia.",
      zh: "-"
    },
    "¿CUANDO COMIENZA Y TERMINA UNA FECHA EN LA LIGA JUGAPLAY?": {
      es: "¿CUANDO COMIENZA Y TERMINA UNA FECHA EN LA LIGA JUGAPLAY?",
      en: "WHEN DOES A DATE START IN THE JUGAPLAY LEAGUE?",
      pt: "QUANDO A DATA COMEÇAR NA LIGA JUGAPLAY?",
      zh: "-"
    },
    "Las fechas comienzan y terminan los días Lunes. Es posible que algunas ligas posean 4 fechas, y otras 5 fechas, dependiendo del calendario anual. Siempre revisa el período en la sección de la Liga Jugaplay.": {
      es: "Las fechas comienzan y terminan los días Lunes. Es posible que algunas ligas posean 4 fechas, y otras 5 fechas, dependiendo del calendario anual. Siempre revisa el período en la sección de la Liga Jugaplay.",
      en: "The dates begin and end on Monday. It is possible that some leagues have 4 dates, and another 5 dates, depending on the annual calendar. Always check the period in the Jugaplay League section.",
      pt: "As datas começam e terminam na segunda-feira. É possível que algumas ligas tenham 4 datas e outras 5 datas, dependendo do calendário anual. Verifique sempre o período na seção Jugaplay League.",
      zh: "-"
    },
    "¿COMO ME REGISTRO EN LA LIGA JUGAPLAY?": {
      es: "¿COMO ME REGISTRO EN LA LIGA JUGAPLAY?",
      en: "HOW DO I REGISTER IN THE JUGAPLAY LEAGUE?",
      pt: "COMO EU REGISTO NA LIGA JUGAPLAY?",
      zh: "-"
    },
    "No es necesario realizar un registro. Solo debes jugar tus partidos en modo Oficial y automáticamente participas de la Liga vigente.": {
      es: "No es necesario realizar un registro. Solo debes jugar tus partidos en modo Oficial y automáticamente participas de la Liga vigente.",
      en: "It is not necessary to make a record. You only have to play your matches in Official mode and automatically participate in the current League.",
      pt: "Não é necessário fazer um registro. Você só tem que jogar suas partidas no modo Oficial e participar automaticamente da Liga atual.",
      zh: "-"
    },
    "Tu feedback es muy importante para nosotros. Estamos conociendo nuestros usuarios y nos interesa muchísimo que encuentren en Jugaplay un espacio común para competir con amigos manifestar su conocimiento futbolero.": {
      es: "Tu feedback es muy importante para nosotros. Estamos conociendo nuestros usuarios y nos interesa muchísimo que encuentren en Jugaplay un espacio común para competir con amigos manifestar su conocimiento futbolero.",
      en: "Your feedback is very important to us. We are getting to know our users and we are very interested in finding in Jugaplay a common space to compete with friends to manifest their football knowledge.",
      pt: "Os nossos comentários são muito importantes para nós. Estamos a conhecer os nossos utilizadores e estamos muito interessados em encontrar no Jugaplay um espaço comum para competir com amigos para manifestar o seu conhecimento de futebol.",
      zh: "-"
    },
    "Contános sobre tu experiencia en Jugaplay o escribe una consulta, te estaremos contestando a la brevedad.": {
      es: "Contános sobre tu experiencia en Jugaplay o escribe una consulta, te estaremos contestando a la brevedad.",
      en: "Tell us about your experience in Jugaplay or write a question, we will be answering you as soon as possible.",
      pt: "Conte-nos sobre sua experiência em Jugaplay ou escreva uma pergunta, nós estaremos respondendo o mais rápido possível.",
      zh: "-"
    },
    "Enviar": {
      es: "Enviar",
      en: "Submit",
      pt: "Enviar",
      zh: "-"
    },
    "El contenido del mensaje no puede ser mayor a 2000 caracteres, sino escriba a info@jugaplay.com": {
      es: "El contenido del mensaje no puede ser mayor a 2000 caracteres, sino escriba a info@jugaplay.com",
      en: "The content of the message can not be greater than 2000 characters, but write to info@jugaplay.com",
      pt: "O conteúdo da mensagem não pode ser superior a 2000 caracteres, mas escreva para info@jugaplay.com",
      zh: "-"
    },
    "El campo comentario es obligatorio": {
      es: "El campo comentario es obligatorio",
      en: "The comment field is required",
      pt: "O campo de comentários é obrigatório",
      zh: "-"
    },
    "Contenido Maximo exedido": {
      es: "Contenido Máximo exedido",
      en: "Maximum content exceeded",
      pt: "Teor máximo excedido",
      zh: "-"
    },
    "Sin Contenido": {
      es: "Sin Contenido",
      en: "Without Content",
      pt: "Sem Conteúdo",
      zh: "-"
    },
    "Muchas gracias por su comentario": {
      es: "Muchas gracias por su comentario",
      en: "Thank you very much for your comment",
      pt: "Muito obrigado pelo seu comentário",
      zh: "-"
    },
    "Su feedback es muy importante para nosotros": {
      es: "Su opinión es muy importante para nosotros",
      en: "Your feedback is very important to us",
      pt: "Sua opinião é muito importante para nós",
      zh: "-"
    },
    comentario: {
      es: "Comentario",
      en: "Commentary",
      pt: "Comente",
      zh: "-"
    },
    'Como usuario de nuestros servicios, queremos que le quede claro cómo utilizamos su información y las maneras en las que usted puede proteger su privacidad.<br> En nuestra Política de Privacidad se explica:<br> •qué información recopilamos y por qué la recopilamos.<br> •cómo usamos esa información.<br> •las opciones que ofrecemos, incluido el modo de acceder y actualizar la información.<br> Hemos tratado de mantenerlo de la manera más simple posible, pero si no conoce términos como cookies, direcciones de IP, etiquetas de píxeles y navegadores, primero lea sobre estos términos clave. Su privacidad es importante para Jugaplay, de modo que aunque sea nuevo en Jugaplay o un usuario de largo tiempo, por favor, tómese un momento para conocer nuestras prácticas y si tiene alguna pregunta comuníquese con nosotros.<br><br> Información que recopilamos:<br> Recopilamos información de las siguientes maneras:<br> •Información que usted nos proporciona. Cuando lo hace, le solicitamos información personal, como su nombre, dirección de correo electrónico, número de teléfono o de tarjeta de crédito para almacenarla junto con su cuenta.<br> •Información que obtenemos de su uso de nuestros servicios.<br> ◦Información del dispositivo<br> ◦Información de registro. Esto incluye:<br> ▪detalles sobre el modo en que utilizó nuestro servicio, como sus consultas de búsqueda.<br> ▪información de enrutamiento de SMS y tipos de llamadas.<br> ▪Dirección de protocolo de Internet.<br> ▪información de evento del dispositivo, como fallas, actividad del sistema, configuración del hardware, tipo de navegador, idioma del navegador, fecha y hora de su solicitud y URL de referencia.<br> ◦Información de la ubicación<br> ◦Números de aplicación únicos<br> ◦Almacenamiento local<br> ◦Cookies y tecnologías similares.<br> la información que recopilamos<br> Utilizamos la información que recopilamos de todos nuestros servicios para proveerlos, mantenerlos, protegerlos y mejorarlos, para desarrollar otros servicios nuevos y para proteger a Jugaplay y a nuestros usuarios.<br><br> Acceso y actualización de su información personal:<br> Siempre que usted usa nuestros servicios, nos proponemos brindarle acceso a su información personal. Si esa información es incorrecta, nos esforzamos por ofrecerle maneras de actualizarla o eliminarla rápidamente (a menos que debamos conservar esa información por motivos comerciales o legales legítimos). Si actualiza su información personal, tal vez le pidamos que verifique su identidad antes de que podamos actuar según su solicitud.<br> Es posible que rechacemos las solicitudes que son irrazonablemente repetitivas, requieren un esfuerzo técnico desproporcionado (por ejemplo, desarrollar un sistema nuevo o cambiar una práctica actual radicalmente), ponen en riesgo la privacidad de otros o resultan muy poco prácticas (por ejemplo, aquellas solicitudes relacionadas con la información almacenada en sistemas de copia de seguridad).<br> Cuando podamos proporcionar el acceso y la corrección de la información, lo haremos de forma gratuita, a menos que se requiera un esfuerzo desproporcionado. Nos proponemos mantener nuestros servicios de manera tal que se proteja la información de una destrucción accidental o maliciosa. Debido a ésto, luego de que usted elimine información de nuestros servicios, podríamos no eliminar inmediatamente las copias residuales de nuestros servidores activos, ni las copias de seguridad de nuestros sistemas.<br><br> Información que compartimos:<br> No compartimos información personal con empresas, organizaciones o personas que no forman parte o están asociadas a Jugaplay, a menos que se produzca alguna de las siguientes circunstancias:<br> •Con su consentimiento<br> •Con administradores de dominio<br> •Por favor, consulte la política de privacidad de su administrador de dominio para obtener más información.<br> •Para procesamiento externo<br> • Por motivos legales<br><br> Seguridad de la información:<br> Nos esforzamos en proteger a Jugaplay y nuestros usuarios del acceso no autorizado o cualquier modificación, divulgación o destrucción no autorizada de la información que poseemos. En particular:<br> •Revisamos nuestras prácticas de recopilación, almacenamiento y procesamiento de información, incluidas nuestras medidas de seguridad física, para protegernos frente al acceso no autorizado a los sistemas.<br> •Restringimos el acceso a la información personal a los empleados, contratistas y agentes de Jugaplay que necesiten conocer tal información para procesarla por nosotros, y que estén sujetos a estrictas obligaciones contractuales de confidencialidad y puedan ser sancionados o despedidos si no cumplen con estas obligaciones.<br><br> Situaciones en las que se aplica esta Política de Privacidad:<br> Nuestra Política de privacidad se aplica a todos los servicios ofrecidos por Jugaplay Inc. y sus afiliados, pero excluye los servicios que tienen políticas de privacidad separadas que no incorporan la presente Política de privacidad.<br> Nuestra Política de Privacidad no se aplica a los servicios ofrecidos por otras empresas o individuos, incluidos los productos o sitios que puedan aparecer como resultados de búsqueda, los sitios que puedan incluir servicios de Jugaplay u otros sitios vinculados desde nuestros servicios. Nuestra Política de Privacidad no cubre las prácticas de información de otras empresas y organizaciones que anuncian nuestros servicios y que puedan utilizar cookies, etiquetas de píxeles y otras tecnologías para proveer y ofrecer anuncios relevantes.<br> Conformidad y colaboración con las autoridades normativas:<br> Revisamos periódicamente el cumplimiento de nuestra Política de Privacidad. También nos adherimos a varios marcos auto-regulatorios. Cuando recibimos reclamos formales por escrito, nos contactaremos con la persona que realizó el reclamo para hacer un seguimiento. Trabajamos con las autoridades reguladoras correspondientes, incluidas las autoridades locales de protección de datos, a fin de resolver cualquier reclamo relacionado con la transferencia de datos personales que no podemos resolver directamente con nuestros usuarios.<br><br> Modificaciones:<br> Nuestra Política de Privacidad puede modificarse ocasionalmente. No limitaremos sus derechos derivados de la presente Política de Privacidad sin su expreso consentimiento. Publicaremos cualquier modificación de la presente Política de Privacidad en esta página y, si estas modificaciones son significativas, le enviaremos una notificación más destacada (por ejemplo, una notificación por correo electrónico sobre las modificaciones de la política de privacidad, en el caso de determinados servicios). Además, conservaremos las versiones anteriores de la presente Política de Privacidad en un archivo para que pueda consultarlas.': {
      es: "Como usuario de nuestros servicios, queremos que le quede claro cómo utilizamos su información y las maneras en las que usted puede proteger su privacidad.<br> En nuestra Política de Privacidad se explica:<br> •qué información recopilamos y por qué la recopilamos.<br> •cómo usamos esa información.<br> •las opciones que ofrecemos, incluido el modo de acceder y actualizar la información.<br> Hemos tratado de mantenerlo de la manera más simple posible, pero si no conoce términos como cookies, direcciones de IP, etiquetas de píxeles y navegadores, primero lea sobre estos términos clave. Su privacidad es importante para Jugaplay, de modo que aunque sea nuevo en Jugaplay o un usuario de largo tiempo, por favor, tómese un momento para conocer nuestras prácticas y si tiene alguna pregunta comuníquese con nosotros.<br><br> Información que recopilamos:<br> Recopilamos información de las siguientes maneras:<br> •Información que usted nos proporciona. Cuando lo hace, le solicitamos información personal, como su nombre, dirección de correo electrónico, número de teléfono o de tarjeta de crédito para almacenarla junto con su cuenta.<br> •Información que obtenemos de su uso de nuestros servicios.<br> ◦Información del dispositivo<br> ◦Información de registro. Esto incluye:<br> ▪detalles sobre el modo en que utilizó nuestro servicio, como sus consultas de búsqueda.<br> ▪información de enrutamiento de SMS y tipos de llamadas.<br> ▪Dirección de protocolo de Internet.<br> ▪información de evento del dispositivo, como fallas, actividad del sistema, configuración del hardware, tipo de navegador, idioma del navegador, fecha y hora de su solicitud y URL de referencia.<br> ◦Información de la ubicación<br> ◦Números de aplicación únicos<br> ◦Almacenamiento local<br> ◦Cookies y tecnologías similares.<br> la información que recopilamos<br> Utilizamos la información que recopilamos de todos nuestros servicios para proveerlos, mantenerlos, protegerlos y mejorarlos, para desarrollar otros servicios nuevos y para proteger a Jugaplay y a nuestros usuarios.<br><br> Acceso y actualización de su información personal:<br> Siempre que usted usa nuestros servicios, nos proponemos brindarle acceso a su información personal. Si esa información es incorrecta, nos esforzamos por ofrecerle maneras de actualizarla o eliminarla rápidamente (a menos que debamos conservar esa información por motivos comerciales o legales legítimos). Si actualiza su información personal, tal vez le pidamos que verifique su identidad antes de que podamos actuar según su solicitud.<br> Es posible que rechacemos las solicitudes que son irrazonablemente repetitivas, requieren un esfuerzo técnico desproporcionado (por ejemplo, desarrollar un sistema nuevo o cambiar una práctica actual radicalmente), ponen en riesgo la privacidad de otros o resultan muy poco prácticas (por ejemplo, aquellas solicitudes relacionadas con la información almacenada en sistemas de copia de seguridad).<br> Cuando podamos proporcionar el acceso y la corrección de la información, lo haremos de forma gratuita, a menos que se requiera un esfuerzo desproporcionado. Nos proponemos mantener nuestros servicios de manera tal que se proteja la información de una destrucción accidental o maliciosa. Debido a ésto, luego de que usted elimine información de nuestros servicios, podríamos no eliminar inmediatamente las copias residuales de nuestros servidores activos, ni las copias de seguridad de nuestros sistemas.<br><br> Información que compartimos:<br> No compartimos información personal con empresas, organizaciones o personas que no forman parte o están asociadas a Jugaplay, a menos que se produzca alguna de las siguientes circunstancias:<br> •Con su consentimiento<br> •Con administradores de dominio<br> •Por favor, consulte la política de privacidad de su administrador de dominio para obtener más información.<br> •Para procesamiento externo<br> • Por motivos legales<br><br> Seguridad de la información:<br> Nos esforzamos en proteger a Jugaplay y nuestros usuarios del acceso no autorizado o cualquier modificación, divulgación o destrucción no autorizada de la información que poseemos. En particular:<br> •Revisamos nuestras prácticas de recopilación, almacenamiento y procesamiento de información, incluidas nuestras medidas de seguridad física, para protegernos frente al acceso no autorizado a los sistemas.<br> •Restringimos el acceso a la información personal a los empleados, contratistas y agentes de Jugaplay que necesiten conocer tal información para procesarla por nosotros, y que estén sujetos a estrictas obligaciones contractuales de confidencialidad y puedan ser sancionados o despedidos si no cumplen con estas obligaciones.<br><br> Situaciones en las que se aplica esta Política de Privacidad:<br> Nuestra Política de privacidad se aplica a todos los servicios ofrecidos por Jugaplay Inc. y sus afiliados, pero excluye los servicios que tienen políticas de privacidad separadas que no incorporan la presente Política de privacidad.<br> Nuestra Política de Privacidad no se aplica a los servicios ofrecidos por otras empresas o individuos, incluidos los productos o sitios que puedan aparecer como resultados de búsqueda, los sitios que puedan incluir servicios de Jugaplay u otros sitios vinculados desde nuestros servicios. Nuestra Política de Privacidad no cubre las prácticas de información de otras empresas y organizaciones que anuncian nuestros servicios y que puedan utilizar cookies, etiquetas de píxeles y otras tecnologías para proveer y ofrecer anuncios relevantes.<br> Conformidad y colaboración con las autoridades normativas:<br> Revisamos periódicamente el cumplimiento de nuestra Política de Privacidad. También nos adherimos a varios marcos auto-regulatorios. Cuando recibimos reclamos formales por escrito, nos contactaremos con la persona que realizó el reclamo para hacer un seguimiento. Trabajamos con las autoridades reguladoras correspondientes, incluidas las autoridades locales de protección de datos, a fin de resolver cualquier reclamo relacionado con la transferencia de datos personales que no podemos resolver directamente con nuestros usuarios.<br><br> Modificaciones:<br> Nuestra Política de Privacidad puede modificarse ocasionalmente. No limitaremos sus derechos derivados de la presente Política de Privacidad sin su expreso consentimiento. Publicaremos cualquier modificación de la presente Política de Privacidad en esta página y, si estas modificaciones son significativas, le enviaremos una notificación más destacada (por ejemplo, una notificación por correo electrónico sobre las modificaciones de la política de privacidad, en el caso de determinados servicios). Además, conservaremos las versiones anteriores de la presente Política de Privacidad en un archivo para que pueda consultarlas.",
      en: "As a user of our services, we want you to be clear about how we use your information and the ways in which you can protect your privacy. <br> Our Privacy Policy explains: <br> • what information we collect and why we collect it . <br> • how we use that information. <br> • the options we offer, including how to access and update information. <br> We have tried to keep it as simple as possible, but if you do not know terms like cookies , IP addresses, pixel tags and browsers, first read about these key terms. Your privacy is important to Jugaplay, so even if you are new to Jugaplay or a long time user, please take a moment to learn about our practices and if you have any questions, please contact us. <br> <br> Information we collect : <br> We collect information in the following ways: <br> • Information that you provide us. When you do so, we ask you for personal information, such as your name, email address, telephone number or credit card number to store it with your account. <br> • Information we obtain from your use of our services. <br> ◦Information of the device <br> ◦Registration information. This includes: <br> ▪ details on the way you used our service, such as your search queries. <br> ▪ SMS routing information and types of calls. <br> ▪ Internet protocol address. ▪ device event information, such as faults, system activity, hardware configuration, browser type, browser language, date and time of your request and reference URL. ◦ ◦ Location information <br> ◦Numbers unique applications <br> ◦Local storage <br> ◦Cookies and similar technologies <br> <br> information we collect <br> We use the information we collect from all our services to provide, maintain, protect and improve them, to develop other services new and to protect Jugaplay and our users. <br> <br> Access and update of your personal information: <br> Whenever you use our services, we propose to give you access to your personal information. If that information is incorrect, we strive to offer you ways to update or eliminate it quickly (unless we should keep that information for legitimate business or legal reasons). If you update your personal information, we may ask you to verify your identity before we can act on your request. <br> We may reject requests that are unreasonably repetitive, require a disproportionate technical effort (for example, develop a new system or change a current practice radically), put others' privacy at risk or are very impractical (for example, those requests related to information stored in backup systems). <br> When we can provide access and correction of information, we will do it for free, unless a disproportionate effort is required. We intend to maintain our services in such a way as to protect the information from accidental or malicious destruction. Because of this, after you delete information from our services, we may not immediately delete the residual copies of our active servers, nor the backup copies of our systems. <br> <br> Information we share: <br> We do not share personal information with companies, organizations or people that are not part of or associated with Jugaplay, unless one of the following circumstances occurs: <br> • With your consent <br> • With domain administrators <br> • Please , check the privacy policy of your domain administrator for more information. <br> • For external processing <br> • For legal reasons <br> <br> Information security: <br> We strive to protect Jugaplay and our users of unauthorized access or any modification, disclosure or unauthorized destruction of the information we possess. In particular: <br> • We review our information collection, storage and processing practices, including our physical security measures, to protect ourselves from unauthorized access to systems. <br> • We restrict access to personal information to users. employees, contractors and agents of Jugaplay who need to know such information to process it for us, and who are subject to strict contractual obligations of confidentiality and may be sanctioned or dismissed if they do not comply with these obligations. <br> <br> Situations in which This Privacy Policy applies: <br> Our Privacy Policy applies to all services offered by Jugaplay Inc. and its affiliates, but excludes services that have separate privacy policies that do not incorporate this Policy.",
      pt: "Como usuário de nossos serviços, queremos que você seja claro sobre como usamos suas informações e as formas em que você pode proteger sua privacidade. Nossa Política de Privacidade explica: <br> • quais informações coletamos e por que a coletamos . <br> <br> como usamos essas informações. <br> • as opções que oferecemos, incluindo a forma de acessar e atualizar informações. <br> Tentamos mantê-la tão simples quanto possível, mas se você não conhece termos como cookies , Endereços de IP, tags de pixel e navegadores, primeiro leia sobre esses termos-chave. Sua privacidade é importante para o Jugaplay, então, mesmo que seja novo para o Jugaplay ou para um usuário de longa data, aproveite um momento para aprender sobre nossas práticas e, se tiver alguma dúvida, entre em contato conosco. <br> <br> Informações que coletamos : <br> Coletamos informações das seguintes formas: <br> • Informações que você nos forneceu. Quando você faz isso, solicitamos informações pessoais, como seu nome, endereço de e-mail, número de telefone ou número de cartão de crédito para armazená-lo com sua conta. <br> • Informações que obtemos do uso de nossos serviços. ◦Informação do dispositivo <br> ◦ Informações de registro. Isso inclui: <br> ▪ detalhes sobre a forma como você usou nosso serviço, como suas consultas de pesquisa. <br> ▪ Informações de roteamento de SMS e tipos de chamadas. <br> ▪ Endereço de protocolo da Internet. ▪ informações do evento do dispositivo, como falhas, atividade do sistema, configuração de hardware, tipo de navegador, idioma do navegador, data e hora do seu pedido e URL de referência. ◦ ◦ Informações de localização <br> ◦Numeros Aplicações únicas <br> ◦Omazenamento local <br> ◦Cookies e tecnologias similares <br> <br> informações que coletamos | Usamos as informações que coletamos de todos os nossos serviços para fornecer, mantê-los, protegê-los e aprimorá-los, para desenvolver outros serviços novo e para proteger o Jugaplay e os nossos usuários. <br> <br> Acesse e atualize suas informações pessoais: sempre que você usa nossos serviços, propomos dar-lhe acesso às suas informações pessoais. Se essa informação estiver incorreta, nos esforçamos para oferecer-lhe formas de atualizá-la ou eliminá-la rapidamente (a menos que devamos manter essa informação por motivos comerciais ou legais legítimos). Se você atualizar suas informações pessoais, podemos pedir que você verifique sua identidade antes que possamos agir em seu pedido. Nós podemos rejeitar solicitações que são excessivamente repetitivas, exigem um esforço técnico desproporcionado (por exemplo, desenvolva um novo sistema ou alterar uma prática atual de forma radical), colocar a privacidade dos outros em risco ou são muito impraticáveis ​​(por exemplo, aqueles pedidos relacionados a informações armazenadas em sistemas de backup). Quando podemos fornecer acesso e correção de informações, faremos isso de graça, a menos que seja necessário um esforço desproporcional. Pretendemos manter nossos serviços de forma a proteger as informações de destruição acidental ou maliciosa. Por isso, depois de excluir informações de nossos serviços, não podemos excluir imediatamente as cópias residuais de nossos servidores ativos, nem as cópias de backup de nossos sistemas. <br> <br> Informações que compartilhamos: <br> Nós não compartilhamos informações pessoais com empresas, organizações ou pessoas que não fazem parte ou estão associadas ao Jugaplay, a menos que uma das seguintes circunstâncias ocorra: <br> • Com o seu consentimento <br> • Com administradores de domínio <br> • Por favor , verifique a política de privacidade do seu administrador de domínio para obter mais informações. <br> • Para processamento externo <br> • Por razões legais <br> <br> Segurança da informação: <br> Nós nos esforçamos para proteger Jugaplay e nossos usuários de acesso não autorizado ou qualquer modificação, divulgação ou destruição não autorizada da informação que possuímos. Em particular: <br> • Revisamos nossas práticas de coleta, armazenamento e processamento de informações, incluindo nossas medidas de segurança física, para nos proteger contra o acesso não autorizado aos sistemas. • Restringimos o acesso a informações pessoais aos usuários. funcionários, empreiteiros e agentes da Jugaplay que precisam saber essa informação para processá-la para nós e que estão sujeitos a obrigações contratuais estritas de confidencialidade e podem ser sancionados ou demitidos se não cumprirem essas obrigações. <br> <br> Situações em que Esta Política de Privacidade aplica-se: <br> Nossa Política de Privacidade aplica-se a todos os serviços oferecidos pela Jugaplay Inc. e suas afiliadas, mas exclui serviços que possuem políticas de privacidade separadas que não incorporam esta Política.",
      zh: "-"
    },// Imagenes!!
    '<img src="img/slider/liga_jugaplay.jpg" alt="Liga Jugaplay" class="img-responsive">': {
      es: '<img src="img/slider/liga_jugaplay.jpg" alt="Liga Jugaplay" class="img-responsive" />',
      en: '<img src="img/slider/liga_jugaplay_en.jpg" alt="Liga Jugaplay" class="img-responsive" />',
      pt: '<img src="img/slider/liga_jugaplay_pt.jpg" alt="Liga Jugaplay" class="img-responsive" />',
      zh: "-"
    },
    '<img src="img/icons/coins/x2_pop.jpg" style="width: 70%;">': {
      es: '<img src="img/icons/coins/x2_pop.jpg" style="width: 70%;">',
      en: '<img src="img/icons/coins/x2_pop_en.jpg" style="width: 70%;">',
      pt: '<img src="img/icons/coins/x2_pop_pt.jpg" style="width: 70%;">',
      zh: "-"
    },
    "Como elegir": {
      es: "Cómo elegir",
      en: "How to choose",
      pt: "Como escolher",
      zh: "-"
    },
    "Desafiá a amigos": {
      es: "Desafiá a amigos",
      en: "Challenge friends",
      pt: "Desafiar amigos",
      zh: "-"
    },
    '<img src="img/explicaciones/como_jugar/1.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/como_jugar/1.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/como_jugar/1_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/como_jugar/1_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/como_jugar/2.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/como_jugar/2.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/como_jugar/2_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/como_jugar/2_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/elegir_jugadores/1.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/1.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/1_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/1_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/elegir_jugadores/2.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/2.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/2_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/2_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/elegir_jugadores/3.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/3.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/3_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/3_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/elegir_jugadores/4.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/4.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/4_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/elegir_jugadores/4_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/como_desafios/1.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/como_desafios/1.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/como_desafios/1_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/como_desafios/1_pt.jpg" alt="">',
      zh: "-"
    },
    '<span class="trn"><img src="img/explicaciones/como_desafios/2.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/como_desafios/2.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/como_desafios/2_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/como_desafios/2_pt.jpg" alt="">',
      zh: "-"
    },
    '<img src="img/explicaciones/ver_vivo/1.jpg" alt="">': {
      es: '<span class="trn"><img src="img/explicaciones/ver_vivo/1.jpg" alt="">',
      en: '<span class="trn"><img src="img/explicaciones/ver_vivo/1_en.jpg" alt="">',
      pt: '<span class="trn"><img src="img/explicaciones/ver_vivo/1_pt.jpg" alt="">',
      zh: "-"
    },
    "En este momento no hay vídeos disponibles, por favor intente más tarde": {
      es: "En este momento no hay vídeos disponibles, por favor intente más tarde",
      en: "At this time there are no videos available, please try later",
      pt: "Neste momento, não há vídeos disponíveis, tente mais tarde",
      zh: "-"
    },
    "Sin vídeo disponible": {
      es: "Sin vídeo disponible",
      en: "No video available",
      pt: "Nenhum vídeo disponível",
      zh: "-"
    },
    "Moneda": {
      es: "Moneda",
      en: "Currency",
      pt: "Moeda",
      zh: "-"
    },
    "<b>¡Vaya!</b> Ha ocurrido un error.": {
      es: "<b>¡Vaya!</b> Ha ocurrido un error.",
      en: "<b>Oops!</b> An error has occurred.",
      pt: "<b>Oops!</b> Ocorreu um erro.",
      zh: "-"
    },
    "No se ha completado el pago.": {
      es: "No se ha completado el pago.",
      en: "The payment has not been completed.",
      pt: "O pagamento não foi concluído.",
      zh: "-"
    },
    "No perteneces a ningun grupo o no tienes desafíos creados.": {
      es: "No perteneces a ningun grupo o no tienes desafíos creados.",
      en: "You do not belong to any group or you do not have created challenges.",
      pt: "Você não pertence a nenhum grupo ou não criou desafios.",
      zh: "-"
    },
    "¡Invitá a tus amigos y demostrá quién es el mejor!": {
      es: "¡Invitá a tus amigos y demostrá quién es el mejor!",
      en: "Invite your friends and show who is the best!",
      pt: "Convide seus amigos e mostre quem é o melhor!",
      zh: "-"
    },
    "Invitar un amigo": {
      es: "Invitar un amigo",
      en: "Invite a friend",
      pt: "Convide um amigo",
      zh: "-"
    },
    "de": {
      es: "de",
      en: "of",
      pt: "de",
      zh: "-"
    },
    "si": {
      es: "si",
      en: "yes",
      pt: "sim",
      zh: "-"
    },
    "no": {
      es: "no",
      en: "no",
      pt: "não",
      zh: "-"
    },
    "Encuestas": {
      es: "Encuestas",
      en: "Surveys",
      pt: "Pesquisas",
      zh: "-"
    },
    "¡Completa una encuesta y obtén fichas gratis!": {
      es: "¡Completa una encuesta y obtén fichas gratis!",
      en: "Complete a survey and get free chips!",
      pt: "Complete uma pesquisa e obtenha fichas grátis!",
      zh: "-"
    },
    "Completa la encuesta del día:": {
      es: "Completa la encuesta del día:",
      en: "Complete the survey of the day:",
      pt: "Complete the survey of the day:",
      zh: "-"
    },
    "¡Promo! Responde YA!": {
      es: "¡Promo! Responde YA!",
      en: "Promo! Answer NOW!",
      pt: "Promo! Responda AGORA!",
      zh: "-"
    },
    "CONTESTAR": {
      es: "CONTESTAR",
      en: "ANSWER",
      pt: "RESPOSTA",
      zh: "-"
    },
    "Próxima encuesta en": {
      es: "Próxima encuesta en",
      en: "Next survey in",
      pt: "Próxima pesquisa em",
      zh: "-"
    },
    "A esperar!!": {
      es: "A esperar!!",
      en: "To wait!!",
      pt: "Para esperar!!",
      zh: "-"
    },
    "Hay encuestas limitadas, por lo que tiene que esperar para la próxima.": {
      es: "Hay encuestas limitadas, por lo que tiene que esperar para la próxima.",
      en: "There are limited surveys, so you have to wait for the next one.",
      pt: "Há pesquisas limitadas, então você precisa esperar pelo próximo.",
      zh: "-"
    },
    "Cargando": {
      es: "Cargando",
      en: "Loading",
      pt: "Carregando",
      zh: "-"
    },
    "Por favor espere mientras se cargan las opciones.": {
      es: "Por favor espere mientras se cargan las opciones.",
      en: "Please wait while the options are loaded.",
      pt: "Aguarde enquanto as opções são carregadas.",
      zh: "-"
    },
    "Si esto persiste verifique su conexión.": {
      es: "Si esto persiste verifique su conexión.",
      en: "If this persists check your connection.",
      pt: "Se isso persistir, verifique sua conexão.",
      zh: "-"
    },
    "ENCUESTA EXTERNA": {
      es: "ENCUESTA EXTERNA",
      en: "EXTERNAL SURVEY",
      pt: "PEQUISA EXTERNO",
      zh: "-"
    },
    '<a href="#" style="float:right;" class="close" data-dismiss="alert" aria-label="close">×</a> <p>Las <strong>"Encuestas externas"</strong> se abren en un sitio web aparte. En general tienen un <strong>tiempo de duración más largo</strong> que la "encuesta del día".</p><p>Revisa el <strong><i class="fa fa-2x fa-clock-o" aria-hidden="true"></i> </strong> en el detalle para conocer cuanto tiempo te puede consumir responderla.</p><p>El ícono <strong><i class="fa fa-2x fa-pencil-square-o" aria-hidden="true"></i> </strong> marca cuantas preguntas debes responder aproximadamente.</p><p>Para las encuestas externas, el comienzo del <strong>código postal</strong> es la letra de la provincia ejemplo Buenos aires B, Capital C y Santa fe F. Ejemplo codigo provincia de Buenos Aires, B1669</p>': {
      es: '<a href="#" style="float:right;" class="close" data-dismiss="alert" aria-label="close">&times;</a> <p>Las <strong>"Encuestas externas"</strong> se abren en un sitio web aparte. En general tienen un <strong>tiempo de duración más largo</strong> que la "encuesta del día".</p><p>Revisa el <strong><i class="fa fa-2x fa-clock-o" aria-hidden="true"></i> </strong> en el detalle para conocer cuanto tiempo te puede consumir responderla.</p><p>El ícono <strong><i class="fa fa-2x fa-pencil-square-o" aria-hidden="true"></i> </strong> marca cuantas preguntas debes responder aproximadamente.</p><p>Para las encuestas externas, el comienzo del <strong>código postal</strong> es la letra de la provincia ejemplo Buenos aires B, Capital C y Santa fe F. Ejemplo codigo provincia de Buenos Aires, B1669</p>',
      en: '<a href = "#" style = "float: right;" class="close" data-dismiss="alert" aria-label="close"> &times; </a> <p> The <strong> "External Surveys" </strong> open on a separate website. In general they have a <strong> longer duration </strong> than the "day survey". </p> <p> Check the <strong> <i class = "fa fa-2x fa-clock-o "aria-hidden =" true "> </i> </strong> in detail to know how much time it might take you to answer it. </p> <p> The icon <strong> <i class =" fa fa-2x fa-pencil-square-o "aria-hidden =" true "></i> </strong> mark how many questions you should answer approximately. </p> <p> For external surveys, the beginning of the <strong> code postal </strong> is the letter of the province example Buenos Aires B, Capital C and Santa fe F. Example code province of Buenos Aires, B1669 </p>',
      pt: '<a href = "#" style = "float: right;" class="close" data-dismiss="alert" aria-label="close"> &times; </a> <p> O <strong> "Pesquisas externas" </strong> abre em um site separado. Em geral, eles têm uma <strong> duração maior </strong> do que a "pesquisa do dia". </p> <p> Verifique o <strong> <i class = "fa fa-2x fa-clock-o "aria-hidden =" true "> </i> </strong> em detalhes para saber quanto tempo pode levar você a responder. </p> <p> O ícone <strong> <i class =" fa fa-2x fa-pencil-square-o "aria-hidden =" true "></i> </strong> marque quantas perguntas você deve responder aproximadamente. </p> <p> Para pesquisas externas, o início do código <strong> postal </strong> é a letra da província exemplo Buenos Aires B, Capital C e Santa fe F. Exemplo código província de Buenos Aires, B1669 </p>',
      zh: "-"
    },
    "Comparta su opinión sobre las cosas que importan!": {
      es: "Comparta su opinión sobre las cosas que importan!",
      en: "Share your opinion on the things that matter!",
      pt: "Compartilhe sua opinião sobre as coisas que importam!",
      zh: "-"
    },
    "Comenzar": {
      es: "Comenzar",
      en: "Start",
      pt: "Comece",
      zh: "-"
    },
    "No, gracias": {
      es: "No, gracias",
      en: "No thanks",
      pt: "Não, obrigado",
      zh: "-"
    },
    "Elija una": {
      es: "Elija una",
      en: "Choose one",
      pt: "Escolha um",
      zh: "-"
    },
    "Elegir": {
      es: "Elegir",
      en: "To choose",
      pt: "Escolha",
      zh: "-"
    },
    "Elija al menos una": {
      es: "Elija al menos una",
      en: "Choose at least one",
      pt: "Escolha pelo menos um",
      zh: "-"
    },
    "Completar": {
      es: "Completar",
      en: "To complete",
      pt: "Complete",
      zh: "-"
    },
    "¡Muchas gracias!": {
      es: "¡Muchas gracias!",
      en: "Thank you very much!",
      pt: "Obrigado!",
      zh: "-"
    },
    "Ha finalizado la encuesta. <br><small>¡Oprime el botón para cobrar las monedas!</small>": {
      es: "Ha finalizado la encuesta. <br><small>¡Oprime el botón para cobrar las monedas!</small>",
      en: "You have finished the survey. <br> <small> Press the button to collect the coins! </small>",
      pt: "Você concluiu a pesquisa. <br> <small> Pressione o botão para coletar as moedas! </small>",
      zh: "-"
    },
    "COBRAR": {
      es: "COBRAR",
      en: "COLLECT",
      pt: "COBRAR",
      zh: "-"
    },
    "Siguiente": {
      es: "Siguiente",
      en: "Next",
      pt: "Próximo",
      zh: "-"
    },
    "Sin conexión": {
      es: "Sin conexión",
      en: "Without connection",
      pt: "Sem conexão",
      zh: "-"
    },
    "No se encontró una conexión a internet, por favor verifique la misma.": {
      es: "No se encontró una conexión a internet, por favor verifique la misma.",
      en: "No internet connection was found, please verify it.",
      pt: "Não foi encontrada uma conexão à Internet, verifique-a.",
      zh: "-"
    },
    "Conexión muy lenta": {
      es: "Conexión muy lenta",
      en: "Very slow connection",
      pt: "Conexão muito lenta",
      zh: "-"
    },
    "La conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.": {
      es: "La conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.",
      en: "The internet connection is very slow. You may not be able to enjoy the Jugaplay experience due to this cause.",
      pt: "A conexão com a internet é muito lenta. Talvez você não possa desfrutar da experiência Jugaplay devido a essa causa.",
      zh: "-"
    },    // Agregados mobile Sin conexión
    "Conseguir fichas": {
      es: "Conseguir fichas",
      en: "Get chips",
      pt: "Obter fichas",
      zh: "-"
    },
    "Filtrar Campeonatos": {
      es: "Filtrar Campeonatos",
      en: "Filter Championships",
      pt: "Filtragem os Campeonatos ",
      zh: "-"
    },
    "Archivo": {
      es: "Archivo",
      en: "File",
      pt: "Arquivo",
      zh: "-"
    },
    "PRIMER PUESTO": {
      es: "PRIMER PUESTO",
      en: "FIRST PLACE",
      pt: "PRIMEIRO LUGAR",
      zh: "-"
    },
    "SEGUNDO PUESTO": {
      es: "SEGUNDO PUESTO",
      en: "SECOND PLACE",
      pt: "SEGUNDO LUGAR",
      zh: "-"
    },
    "TERCER PUESTO": {
      es: "TERCER PUESTO",
      en: "THIRD PLACE",
      pt: "TERCEIRO LUGAR",
      zh: "-"
    },
    "Copiar link": {
      es: "Copiar link",
      en: "Copy link",
      pt: "Copiar link",
      zh: "-"
    },
    "¡Invita amigos!": {
      es: "¡Invita amigos!",
      en: "Invite friends!",
      pt: "Convide amigos!",
      zh: "-"
    },
    '<strong>En caso de empate: desempatan el capitan <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;width: 16px;"> y luego el sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;width: 16px;"></strong>': {
      es: '<strong>En caso de empate: desempatan el capitan <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;width: 16px;"> y luego el sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;width: 16px;"></strong>',
      en: '<strong> In case of a tie: define the tie the captain <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;width: 16px;"> and then the sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;width: 16px;"></strong>',
      pt: '<strong> Em caso de empate: define o capitão <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;width: 16px;"> e depois o sub capitão <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;width: 16px;"></strong>',
      zh: "-"
    },
    "-": {
      es: "-",
      en: "-",
      pt: "-",
      zh: "-"
    }

  };
  if(IsJsonString(getCookie("langSite-Jp"))){
  	window.languageOfSiteJp=validLanguageForJp(JSON.parse(getCookie("langSite-Jp")));
    checkLanguage(window.languageOfSiteJp);
  }else{
  	window.languageOfSiteJp=validLanguageForJp((navigator.language || navigator.userLanguage).substring(0, 2));
    changeLanguageJp(window.languageOfSiteJp);
  }
});
function validLanguageForJp(lang){
  if(["es","en","pt","zh"].indexOf(lang.toLowerCase())>-1){
    return lang.toLowerCase();
  }else{
    return "en";
  }
}
function changeLanguageJp(lang){
  window.languageOfSiteJp=validLanguageForJp(lang);
  checkLanguage(validLanguageForJp(lang));
  var jsonUpdt=JSON.stringify(validLanguageForJp(lang));
	setCookie("langSite-Jp", jsonUpdt, 120);
}
function checkLanguage(lang){
  var _t = $('body').translate({lang: lang, t: window.t});
  var str = _t.g("translate");
}
function checkLanguageItem(dialogItself){
  //console.log("Change languge dialog");
  var _t = $(dialogItself.getModal()).translate({lang: window.languageOfSiteJp, t: window.t});
  var str = _t.g("translate");
}
function checkLanguageElement(element){
  //console.log("Change languge element "+window.languageOfSiteJp);
  var _t = $(element).translate({lang: window.languageOfSiteJp, t: window.t});
  var str = _t.g("translate");
}
function dataTableLanguage(){
  if(window.languageOfSiteJp=='en'){return ({"lengthMenu": "Show _MENU_ entries","zeroRecords": "No data available","info": "Showing _PAGE_ of _PAGES_", "infoEmpty": "No data available", "infoFiltered": "(filtered from _MAX_ total records)","sSearch":"Search", "oPaginate":{"sFirst": "First", "sPrevious": "Previous", "sNext": "Next", "sLast": "Last"}});}
  if(window.languageOfSiteJp=='es'){return ({"lengthMenu": "Mostrar _MENU_ registros por página","zeroRecords": "No se encontro nada","info": "Mostrando página _PAGE_ de _PAGES_", "infoEmpty": "Sin información", "infoFiltered": "(Filtrado de _MAX_ Registros)","sSearch":"Buscar", "oPaginate":{"sFirst": "Primera", "sPrevious": "Anterior", "sNext": "Siguiente", "sLast": "Última"}});}
  if(window.languageOfSiteJp=='pt'){return ({"lengthMenu": "Mostrar _MENU_ registros por página","zeroRecords": "Nada foi encontrado","info": "Mostrando página _PAGE_ de _PAGES_", "infoEmpty": "Sem informação", "infoFiltered": "(Filtragem de _MAX_ Registros)","sSearch":"Pesquisar", "oPaginate":{"sFirst": "Primeiro", "sPrevious": "Anterior", "sNext": "Seguida", "sLast": "Último"}});}
}
