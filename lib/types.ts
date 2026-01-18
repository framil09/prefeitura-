import { UserRole, StatusLicitacao, TipoMidia } from "@prisma/client";

export type { UserRole, StatusLicitacao, TipoMidia };

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  secretariaId?: string | null;
  secretariaNome?: string | null;
}

export interface SecretariaType {
  id: string;
  nome: string;
  sigla?: string | null;
  descricao?: string | null;
  secretario?: string | null;
  fotoSecretario?: string | null;
  telefone?: string | null;
  email?: string | null;
  endereco?: string | null;
  ordem: number;
  ativo: boolean;
}

export interface LicitacaoType {
  id: string;
  numero: string;
  modalidade: string;
  objeto: string;
  valorEstimado?: number | null;
  dataAbertura: Date | string;
  dataEncerramento?: Date | string | null;
  status: StatusLicitacao;
  editalUrl?: string | null;
  secretariaId?: string | null;
  secretaria?: SecretariaType | null;
}

export interface NoticiaType {
  id: string;
  titulo: string;
  resumo?: string | null;
  conteudo: string;
  imagemCapa?: string | null;
  destaque: boolean;
  publicado: boolean;
  autorId?: string | null;
  secretariaId?: string | null;
  secretaria?: SecretariaType | null;
  createdAt: Date | string;
}

export interface MidiaType {
  id: string;
  titulo: string;
  descricao?: string | null;
  tipo: TipoMidia;
  url: string;
  thumbnail?: string | null;
  destaque: boolean;
  createdAt: Date | string;
}
