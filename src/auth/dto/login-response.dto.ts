import { UserResponseDTO } from "src/users/dto/user-response.sto";

export class LoginResponseDTO {
  user: UserResponseDTO;
  accessToken: string
}