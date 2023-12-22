export interface PaymentModel {
    ID_Costo:             string;
    Concepto:             string;
    Descripcion:          string;
    Coste:                string;
    Vigencia:             number | null;
    Refenrencia_Bancaria: string | null;
    Creado_En:            string;
    Actualizado_EN:       string | null;
    Active:               boolean;
}

export interface createPaymentModel {
    Concepto:             string;
    Descripcion:          string;
    Coste:                string;
    Vigencia:             string;
    Refenrencia_Bancaria: string;
    Active:               boolean;
}

export interface standByPayments {
    ID_Persona_Coste:     string;
    Creado_En:            string;
    ID_Persona:           string;
    Estudiante_Nombre:    string;
    Imagen:               string | null;
    Concepto:             string;
    Descripcion:          string;
    Coste:                string;
    Vigencia:             number | null;
    Refenrencia_Bancaria: string | null;
}
