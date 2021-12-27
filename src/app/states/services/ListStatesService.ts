import { injectable, inject } from 'tsyringe';
import States from "../models/States";
import StatesRepository from "../repositories/StatesRepository";

interface StateReturn {
  state?: States[];
  message?: string;
}

@injectable()
class ListSatesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: StatesRepository,
  ){}
  public async execute(name: string): Promise<StateReturn> {
    const state = await this.statesRepository.findStates(name);
    if(state.length == 0) {
      return {message: 'Estado não encontrado. Por favor verifique o que foi enviado'}
    }
    return {state};
  }
}

export default ListSatesService;