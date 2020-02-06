// const sgMail = require('@sendgrid/mail')

// const sendgridAPIkey = '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'

// sgMail.setApiKey(sendgridAPIkey)

// const sendWelcomeEmail=(email,name)=>{
//     sgMail.send({
//         to:email,
//         from:'smtsingh538@gmail.com',
//         subject:'Thanks for joining',
//         text:`welcome to the app ${name}`
//     })
// }


const nm = require('nodemailer')

const transporter = nm.createTransport({
    service:'gmail',
    auth:{
        user:'swabhiman7714@gmail.com',
        pass:'proffesional'
    }
})



const sendWelcomeEmail= (email,user)=>{
  transporter.sendMail({
      from:'smtsingh538@gmail.com',
      to:email,
      subject:`welcome ${user}`,
      text:'works'
  },(err,data)=>{
      if(err){
        return  console.log(err)
      }
  })
}

const sendGoodByeEmail = (email,user)=>{
    transporter.sendMail({
        from:'smtsingh538@gmail.com',
        to:email,
        subject:`Bye ${user}`,
        text:'Fck you Just leave!'
    },(err,data)=>{
        if(err){
            return console.log(err)
        }
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}