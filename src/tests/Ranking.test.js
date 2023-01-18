import { renderWithRouterAndRedux, preencheDados} from "./helpers/renderWithRouterAndRedux";
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Ranking from '../pages/Ranking';
import mockData from './helpers/mockData';

const defaultName = 'NomeGenérico';
const defaultEmail = 'teste@teste.com';
const dataTestPlay = 'btn-play';
const dataTestNext = 'btn-next';
const dataTestRanking = 'btn-ranking';

const initialState = {
  player:{
    name: 'Gabriel Dota Fujita',
    assertions: 0,
    score: 0,
    gravatarEmail: ''
}}


const respondePerguntas = () => {
  const respostasCorretas = ['False', 'Graviton', 'Video Card', 'Scar-20/G3SG1', 'Junji Ito'];
  return respostasCorretas.forEach(async (resposta) => {
    const respostaCorreta = await screen.findByText(resposta);
    userEvent.click(respostaCorreta);
    userEvent.click(screen.getByTestId(dataTestNext));
  });
}

describe('Testes relacionados à tela de ranking', () => {
  afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
  });
  test('Verifica se a tela de ranking popssui o URL correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

     preencheDados(defaultName, defaultEmail);
     userEvent.click(screen.getByTestId(dataTestPlay));
     await screen.findByTestId('correct-answer');
     respondePerguntas();
     const btnRanking = await screen.findByTestId(dataTestRanking);
     userEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking')
   });
  test('Verifica se a tela de ranking renderiza os elementos corretos', () => {
    localStorage.setItem('ranking', JSON.stringify([{name: "Gabriel Dota Fujita", score: 87, picture: "ce11fce876c93ed5d2a72da660496473"}]))
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByRole('button')).toHaveTextContent(/jogar novamente/i);
    expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473')
  });
  test('Verifica se a aplicação consegue salvar dois perfis', async () => {
    renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

     preencheDados(defaultName, defaultEmail);
     userEvent.click(screen.getByTestId(dataTestPlay));

     await screen.findByTestId('correct-answer');
     respondePerguntas();

     const btnRanking = await screen.findByTestId(dataTestRanking);
     userEvent.click(btnRanking);
     userEvent.click(await screen.findByTestId('btn-go-home'));

     preencheDados('Nome alternativo', 't@t.co');
     userEvent.click(screen.getByTestId(dataTestPlay));
     await screen.findByTestId('correct-answer');
    const perfis = JSON.parse(localStorage.getItem('ranking'));
    expect(perfis).toHaveLength(2);
  });
  test('Verifica se o ranking renderiza os perfis em ordem de pontos',() => {
    localStorage.setItem('ranking', '[{"name":"Bruno Pinheiro","score":136,"picture":"ee46a962466c5060acf9ef467a9b0bd7"},{"name":"teste","score":58,"picture":"4675ee57486c6ab9507d64d763ffd4f3"},{"name":"asdasd","score":120,"picture":"4f7818f30719e6a65194284a0c58050e"},{"name":"Bruno","score":90,"picture":"4f7818f30719e6a65194284a0c58050e"}]' )
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByTestId('player-score-0')).toHaveTextContent(136)
    expect(screen.getByTestId('player-score-1')).toHaveTextContent(120)
    expect(screen.getByTestId('player-score-2')).toHaveTextContent(90)
  })
  test('Verifica se o botão de inicio, renderiza o componente certo', () => {
    localStorage.setItem('ranking', JSON.stringify([{name: "Gabriel Dota Fujita", score: 87, picture: "ce11fce876c93ed5d2a72da660496473"}]))
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => history.push('/ReactTrivia/ranking'));
    userEvent.click(screen.getByTestId('btn-go-home'));
    expect( screen.getByTestId('input-player-name'));
    expect(history.location.pathname).toBe('/')
  })
})