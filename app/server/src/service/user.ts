import { prisma } from './prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

const createToken = async (
  { id, email }: any,
  secret: string,
  expiresIn: string
) => {
  return await jwt.sign({ id, email }, secret, { expiresIn });
};
const generatePasswordHash = async (password: any) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
const findByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};
const validatePassword = async (inputPassword: string, dbPassword: string) => {
  return await bcrypt.compare(inputPassword, dbPassword);
};

export const getUser = async (_: null, __: null, { verified }: any) => {
  return await prisma.user.findFirst({
    where: {
      id: verified.id,
    },
  });
};

export const signUp = async (
  _: null,
  { username, email, password }: any,
  { jwt }: any
) => {
  const hashPass = await generatePasswordHash(password);
  const id = new Date().getTime().toString();
  const user = await prisma.user.create({
    data: {
      id,
      username,
      email,
      password: hashPass,
    },
  });
  return {
    token: await createToken(user, jwt.secret, jwt.expiresIn),
  };
};

export const signIn = async (
  _: null,
  { email, password }: any,
  { jwt }: any
) => {
  const user = await findByEmail(email);
  if (!user) throw new UserInputError('ユーザーが見つかりませんでした');
  const isValid = await validatePassword(password, user.password);
  if (!isValid) throw new AuthenticationError('パスワードが異なります');
  return {
    token: createToken(
      { id: user.id, email: user.email },
      jwt.secret,
      jwt.expiresIn
    ),
  };
};
