import materialize from 'materialize-css';
import React from 'react';

export default function Copy(props) {
  function copyTextButton() {
    const copyText = document.getElementById(props.target);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    materialize.toast({
      html: "Texto copiado: " + copyText.value, classes: 'rounded'
    });
  }
  return (
    <button 
      className="waves-effect waves-teal btn-flat"
      onClick={copyTextButton}>
      <i className="material-icons">content_copy</i>
    </button>
  );
}