---
author: adnuguk
comments: false
date: 2014-08-08 21:37:08+00:00
slug: contact
title: Contact
permalink: /contact/
style: http://yui.yahooapis.com/pure/0.5.0/pure-min.css
---

<script type="text/javascript">
  window.onload = (function(){
    if(window.location.hash == '#thank-you'){
      document.getElementById('thank-you-message').className = 'none';
    }
  })
</script>

You can get in touch with the group at [@ADNUGUK](http://www.twitter.com/adnuguk), or use the form below

<p id='thank-you-message' class='hidden' style='color:green;'>
  Thank you for contacting the Aberdeen Developers .Net User Group, we'll get back to you, as soon as we can.
</p>
<hr />

<form action="http://getsimpleform.com/messages?form_api_token=7ec9a53c1397534e1b9a0843e668a954" method="post" class="contact pure-form pure-form-aligned">
  <input type='hidden' name='redirect_to' value='http://www.aberdeendevelopers.co.uk/contact#thank-you' />
    <fieldset class='pure-group'>
        <input autofocus='autofocus' class='pure-input-1' name='name' placeholder='Your Name' required='required' type='text' />
        <input class='pure-input-1' name='email' placeholder='Email Address' required='required' type='email' />
    </fieldset>
    <fieldset class='pure-group'>
        <textarea class='pure-input-1' name='message' placeholder='Your Message' required='required' rows='8'> </textarea>
    </fieldset>
    <button class='pure-button pure-input-1' type='submit'>Send Message</button>
</form>
