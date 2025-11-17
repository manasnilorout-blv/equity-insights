export interface BilingualText {
  arabic: string;
  english: string;
}

export interface YearValue {
  value: number | null;
  date: string;
}

export interface Metadata {
  company_name: string;
  company_name_arabic: string;
  report_date: string;
  currency: string;
  currency_unit: string;
  reporting_period: string;
  financial_statement_type: string;
  audit_status: string;
}

export interface PaidUpCapital {
  current_year: YearValue;
  previous_year: YearValue;
  financial_note_reference: string;
  distribution_among_shareholders: any[];
}

export interface CommonShares {
  current_year: {
    value: number | null;
    number_of_shares: number | null;
    par_value: number | null;
  };
  previous_year: {
    value: number | null;
    number_of_shares: number | null;
    par_value: number | null;
  };
  shareholders: any[];
  financial_note_reference: string;
}

export interface PreferredShares {
  current_year: {
    value: number | null;
    number_of_shares: number | null;
  };
  previous_year: {
    value: number | null;
    number_of_shares: number | null;
  };
  terms: {
    dividend_rate: number | null;
    cumulative: boolean | null;
    convertible: boolean | null;
    redemption_terms: string | null;
    redemption_terms_english: string | null;
  };
}

export interface CapitalChange {
  date: string;
  amount: number;
  source?: string;
  reason?: string;
  description: string;
  description_english: string;
}

export interface Reserve {
  type: string;
  type_arabic: string;
  type_english: string;
  current_year: number;
  previous_year: number;
  movement: number;
}

export interface RetainedEarnings {
  current_year: {
    value: number;
    is_loss: boolean;
  };
  previous_year: {
    value: number;
    is_loss: boolean;
  };
  movements: {
    opening_balance: number;
    net_income: number;
    dividends_declared: number;
    other_adjustments: number;
    closing_balance: number;
  };
  financial_note_reference: string | null;
}

export interface EquityComponents {
  paid_up_capital: PaidUpCapital;
  common_shares: CommonShares;
  preferred_shares: PreferredShares;
  additional_paid_up_capital: any;
  capital_changes: {
    increases: CapitalChange[];
    decreases: CapitalChange[];
  };
  branches_current_account: any;
  reserves: {
    total_current_year: number;
    total_previous_year: number;
    breakdown: Reserve[];
    financial_note_reference: string;
  };
  treasury_stocks: any;
  retained_earnings: RetainedEarnings;
  dividends_to_distribute: any;
  minority_interests: any;
  total_equity: {
    current_year: {
      total: number;
      excluding_minority: number;
      including_minority: number;
    };
    previous_year: {
      total: number;
      excluding_minority: number;
      including_minority: number;
    };
  };
}

export interface FinancialNote {
  note_number: string;
  title: string;
  title_english: string;
  content: string;
  content_english: string;
  related_items: string[];
}

export interface EquityData {
  metadata: Metadata;
  equity_components: EquityComponents;
  shareholder_structure: any[];
  valuation_metrics: any;
  financial_notes: FinancialNote[];
  formulas_applied: any;
  data_quality: any;
}

export interface EditedField {
  path: string;
  timestamp: Date;
  originalValue: any;
  newValue: any;
}
