import { renderWithRouterAndRedux, preencheDados} from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.setTimeout(32000);

describe('testes no timer', () => {
test('Verifica se o timer funciona corretamente', async () => {
  renderWithRouterAndRedux(<App />);
  
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

  preencheDados('nome', 't@t.com');
  userEvent.click(screen.getByTestId('btn-play'));
  expect(await screen.findByText(30)).toBeInTheDocument();

  await new Promise((t) => {
    setTimeout(t, 2000);
  });

  expect(await screen.findByText(28)).toBeInTheDocument();

  await new Promise((t) => {
    setTimeout(t, 29000);
  });

  expect(await screen.findByText('Tempo Esgotado!')).toBeInTheDocument();

  })
})