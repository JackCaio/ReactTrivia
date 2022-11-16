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

afterEach(() => {
jest.restoreAllMocks();
localStorage.clear();
});

const respondePerguntas = () => {
  const respostasCorretas = ['False', 'Graviton', 'Video Card', 'Scar-20/G3SG1', 'Junji Ito'];
  return respostasCorretas.forEach(async (resposta) => {
    const respostaCorreta = await screen.findByText(resposta);
    userEvent.click(respostaCorreta);
    userEvent.click(screen.getByTestId(dataTestNext));
  });
}

describe('Testes relacionados à tela de ranking', () => {
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
    expect(screen.getByRole('button')).toHaveTextContent(/início/i);
    expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473')
    screen.logTestingPlaygroundURL();
  });
  test('Verifica se a tela de ranking renderiza os players por ordem de pontos', () => {
    localStorage.setItem('ranking', JSON.stringify([
      {name: "Player1", score: 80, picture: "ce11fce876c93ed5d2a72da660496473"},
      {name: "Player2", score: 30, picture: "ce11fce876c93ed5d2a72da660496473"},
    ]));
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByTestId('player-score-0')).toHaveTextContent(80)
    expect(screen.getByTestId('player-score-1')).toHaveTextContent(30)
    screen.logTestingPlaygroundURL();
  });
  test('Verifica se o botão de inicio, renderiza o componente certo', () => {
    localStorage.setItem('ranking', JSON.stringify([{name: "Gabriel Dota Fujita", score: 87, picture: "ce11fce876c93ed5d2a72da660496473"}]))
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => history.push('/ranking'));
    userEvent.click(screen.getByTestId('btn-go-home'));
    expect( screen.getByTestId('input-player-name'));
    expect(history.location.pathname).toBe('/')
  })
})