import React from 'react';
import Input from './inputComponent';
import './index.css';
import './convert';

export default function Main() {
  return (
    <div className="container">
      <h2>react-text-transformer</h2>
      <Input focus id="mainText" placeholder="Digite um texto aqui" label="Digite um texto aqui"/>
      <h3>Transformações</h3>
      <Input id="inverted" selectFocus placeholder="Texto invertido" label="Texto invertido" copyText readOnly/>
      <Input id="numeric" selectFocus placeholder="Texto numérico" label="Texto numérico" copyText readOnly/>
      <Input id="csv" selectFocus placeholder="Csv" label="Csv" copyText readOnly/>
      <Input id="slug" selectFocus placeholder="Slug" label="Slug" copyText readOnly/>
      <Input id="vowels" selectFocus placeholder="Somente vogais" label="Somente vogais" copyText readOnly/>
      <Input id="consonants" selectFocus placeholder="Somente consoantes" label="Somente consoantes" copyText readOnly/>
      <Input id="variable" selectFocus placeholder="Variável" label="Variável" copyText readOnly/>
    </div>
  );
}
