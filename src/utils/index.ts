import { CompanyType, EncryptedFormType } from '@/types/types';
import { AES } from 'crypto-js';

export const removeDuplicated = (array: string[]) => {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

export const encryptCompanyData = async (
  companyData: CompanyType,
): Promise<EncryptedFormType> => {
  const salt = 'BrazilHexa2026';

  const encryptedData = await AES.encrypt(
    JSON.stringify(companyData),
    salt,
  ).toString();

  return { data: encryptedData, salt: salt };
};

export const decryptCompanyData = async (
  companyData: EncryptedFormType,
): Promise<CompanyType> => {
  const { data, salt } = companyData;

  const decryptedData = await AES.decrypt(data, salt).toString(
    CryptoJS.enc.Utf8,
  );

  const companyDecriptedData: CompanyType = await JSON.parse(decryptedData);

  return companyDecriptedData;
};
