import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/error";
import { db } from "../../app";

interface ISessionRequest {
  email: string;
  password: string;
}

const createSessionClientService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  let user = await db.user
    .findUniqueOrThrow({
      where: { email },
    })
    .catch(() => {
      throw new AppError("Login ou senha inválidos", 401);
    });

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Login ou senha inválidos", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

export { createSessionClientService };
