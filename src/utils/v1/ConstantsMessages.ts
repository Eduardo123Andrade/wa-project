const ENTITY_NOT_FOUNDED = 'Entidade não encontrada'
const ENTITY_INACTIVATED = 'Entidade não está ativa'

const LABORATORY_NOT_FOUNDED = 'Laboratorio não encontrado'
const CANT_DELETE_INACTIVE_LABORATORY = 'Permitido deletar apenas laboratorios ativos'
const LABORATORY_INACTIVATED = 'Laboratorio não está ativo'
const INVALID_LABORATORIES = 'Não existe laboratorio valido'
const LABORATORY_ALREADY_ASSOCIATED = 'O laboratorio já está associado a esse exame'
const MINIMUM_QUANTITY_OF_LABORATORY_ASSOCIATIONS = 'O exame precisa de pelo menos um laboratorio'

const EXAM_NOT_FOUND = 'Exame não encontrado'
const CANT_DELETE_INACTIVE_EXAM = 'Permitido deletar apenas exames ativos'
const EXAM_INACTIVATED = 'O exame não está ativo'
const INVALID_EXAMS = 'Não existe exame valido'

const VALIDATION_ERROR = 'Erro de validação'
const NAME_IS_REQUIRED = 'O Nome é obrigatorio'
const NUMBER_IS_REQUIRED = 'Numero é obrigatorio'
const STREET_IS_REQUIRED = 'Rua é obrigatorio'
const NEIGHBORHOOD_IS_REQUIRED = 'Bairro é obrigatorio'
const CITY_IS_REQUIRED = 'Cidade é obrigatorio'
const STATE_IS_REQUIRED = 'Estado é obrigatorio'
const POSTAL_CODE_IS_REQUIRED = 'Codigo postal é obrigatorio'
const ADDRESS_IS_REQUIRED = 'Endereço é obrigatorio'
const ID_IS_REQUIRED = 'ID é obrigatorio'
const STATUS_IS_REQUIRED = 'Staus é obrigatorio'
const EXAM_TYPE_IS_REQUIRED = 'Tipo de exame é obrigatorio'
const INVALID_EXAM_TYPE = 'Tipo de exam invalidio'
const INVALID_STATUS = 'Status invalido'
const LIST_OF_ID_IS_REQUIRED = 'Lista de IDs é obrigatorio'
const INVALID_MINIMUM_LENGTH_OF_LIST = 'A lista não pode está vazia'
const EXAM_ID_IS_REQUIRED = 'ID do exame é obrigatorio'
const LABORATORY_ID_IS_REQUIRED = 'ID do laboratorio é obrigatorio'
const LIST_OF_LABORATORY_IS_REQUIRED = 'Lista de laboratorios é obrigatoria'
const LIST_OF_EXAMS_IS_REQUIRED = 'Lista de exames é obrigatorio'
const LABORATORY_DATA_IS_REQUIRED = 'Dados de laboratorio são obrigatorios'
const EXAM_DATA_IS_REQUIRED = 'Dados de exam são obrigatorios'

const Error = {
    ENTITY_NOT_FOUNDED,
    ENTITY_INACTIVATED,

    LABORATORY_NOT_FOUNDED,
    CANT_DELETE_INACTIVE_LABORATORY,
    LABORATORY_INACTIVATED,
    INVALID_LABORATORIES,
    LABORATORY_ALREADY_ASSOCIATED,
    MINIMUM_QUANTITY_OF_LABORATORY_ASSOCIATIONS,

    EXAM_NOT_FOUND,
    CANT_DELETE_INACTIVE_EXAM,
    EXAM_INACTIVATED,
    INVALID_EXAMS
}

const Validate = {
    VALIDATION_ERROR,
    NAME_IS_REQUIRED,
    NUMBER_IS_REQUIRED,
    STREET_IS_REQUIRED,
    NEIGHBORHOOD_IS_REQUIRED,
    CITY_IS_REQUIRED,
    STATE_IS_REQUIRED,
    POSTAL_CODE_IS_REQUIRED,
    ADDRESS_IS_REQUIRED,
    ID_IS_REQUIRED,
    STATUS_IS_REQUIRED,
    EXAM_TYPE_IS_REQUIRED,
    INVALID_EXAM_TYPE,
    LIST_OF_ID_IS_REQUIRED,
    INVALID_MINIMUM_LENGTH_OF_LIST,
    INVALID_STATUS,
    EXAM_ID_IS_REQUIRED,
    LABORATORY_ID_IS_REQUIRED,
    LIST_OF_LABORATORY_IS_REQUIRED,
    LABORATORY_DATA_IS_REQUIRED,
    LIST_OF_EXAMS_IS_REQUIRED,
    EXAM_DATA_IS_REQUIRED
}

export const Messages = {
    Error,
    Validate
}