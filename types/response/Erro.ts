export interface ErroCampo {
  campo: string;
  mensagem: string;
}

export interface ErroResponse {
  campos?: ErroCampo[];
  mensagens?: any[];
}
