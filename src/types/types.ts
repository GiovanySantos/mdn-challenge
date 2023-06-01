export type CompanyType = {
  companyName: string;
  corporationDate: string;
  address: string;
  documents: string[];
};

export type EncryptedFormType = {
  data: string;
  salt: string;
};
