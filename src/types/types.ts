type document = {
  name: string;
  size: string;
  content: string;
};

export type CompanyType = {
  companyName: string;
  crporationDate: string;
  address: string;
  documents: document[];
};
