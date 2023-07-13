CREATE DATABASE financeiro;



CREATE TABLE lotes (
	id  serial primary key ,
	nome varchar(100),
	ativo boolean,
	criado_em timestamp not null
);

CREATE TABLE boletos (
	id serial primary key ,
	nome_sacado varchar(255),
	id_lote integer not null references lotes(id),
	valor decimal,
	linha_digitavel VARCHAR(255)
	ativo boolean ,
	criado_em timestamp not null
    
);

create table nome_lote(
  id serial primary key,
  descricao integer not null
  );

