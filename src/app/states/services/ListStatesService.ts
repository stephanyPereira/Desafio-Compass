import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';
import IListStatesDTO from '../dtos/IListStatesDTO';
import StatesRepository from '../repositories/StatesRepository';

@injectable()
class ListSatesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: StatesRepository,
  ) {}

  public async execute(nameState: string): Promise<IListStatesDTO> {
    const state = await this.statesRepository.findStates(nameState.toUpperCase());

    if (state.length === 0) {
      throw new AppError('Estado não encontrado. Por favor verifique o que foi enviado');
    }
    return { state };
  }
}

export default ListSatesService;
