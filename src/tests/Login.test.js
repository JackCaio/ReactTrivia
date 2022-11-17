import { renderWithRouterAndRedux, preencheDados} from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const dataTestName = "input-player-name"
const dataTestEmail = "input-gravatar-email"
const dataTestPlay = "btn-play"
const defaultName = 'nome genérico'
const defaultEmail = 'teste@teste.com'

describe('Testes relacionados á página de login', () => {
beforeEach(() => {
  jest.restoreAllMocks()
  localStorage.clear();
});

  test('Verifica se a aplicação renderiza o componente certo quando iniciado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(dataTestName)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestEmail)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestPlay)).toBeInTheDocument();
    expect(screen.getByTestId("btn-settings")).toBeInTheDocument();
  });
  test('Verifica se a página possui os inputs certos e se da pra digitar neles', () => {
    renderWithRouterAndRedux(<App />);

    preencheDados(defaultName, defaultEmail);
    expect(screen.getByTestId(dataTestName).value).toBe(defaultName);
    expect(screen.getByTestId(dataTestEmail).value).toBe(defaultEmail);
  });
  test('Verifica se o botão está desabilitado quando a página é carregada', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(dataTestPlay)).toBeDisabled();
  });
  test('Verifica se as verificações de email e nome funcionam de maneira correta', () => {
    renderWithRouterAndRedux(<App />);

    const btnPlay = screen.getByTestId(dataTestPlay);
    const inputName = screen.getByTestId(dataTestName);
    const inputEmail = screen.getByTestId(dataTestEmail);

    userEvent.type(inputName, 'nome genérico');
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputEmail, 'teste');
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    expect(btnPlay).toBeEnabled();
  });
  test('Verifica se o botão de configuração redireciona para a página de configuração', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnConfig = screen.getByTestId("btn-settings");
    userEvent.click(btnConfig);
    expect(history.location.pathname).toBe('/configs');
  });
  test('Verifica se o botão de play redireciona para a página correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({token: '123456abcde', results:[
    {
      "category": "Geography",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The Republic of Malta is the smallest microstate worldwide.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },]}),
});
    const { history } = renderWithRouterAndRedux(<App />);
    preencheDados(defaultName, defaultEmail);

    const btnPlay = screen.getByTestId(dataTestPlay);
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'), 1000)
  });
  test('Verifica se a página de login é renderizada caso não se faça o cadastro', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
    history.push('/game');
    });
    await waitFor(() => screen.getByTestId('input-player-name'));
  });
});