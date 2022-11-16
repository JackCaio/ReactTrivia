import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Feedback from "../pages/Feedback";
import userEvent from "@testing-library/user-event";
import { screen, waitFor, act } from "@testing-library/react";

const dataTestFeedback = "feedback-text";
const dataTestPlayAgain = "btn-play-again";
const dataTestRanking = "btn-ranking";
const dataTestName = "header-player-name";
const dataTestPicture = "header-profile-picture";
const dataTestScore = "header-score";
const initialState = {
  player:{
    name: 'Gabriel Dota Fujita',
    assertions: 0,
    score: 0,
    gravatarEmail: ''
}}

describe("Testes relacionados à página de feedBack" , () => {
  it( "Testa se a página de feedback é renderizada" , () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedback = screen.getByTestId(dataTestFeedback);
    expect(feedback).toBeInTheDocument();
  });
  it( "Testa se o botão de jogar novamente é renderizado" , () => {
    renderWithRouterAndRedux(<Feedback />);
    const playAgain = screen.getByTestId(dataTestPlayAgain);
    expect(playAgain).toBeInTheDocument();
  });
  it( "Testa se o botão de ranking é renderizado" , () => {
    renderWithRouterAndRedux(<Feedback />);
    const ranking = screen.getByTestId(dataTestRanking);
    expect(ranking).toBeInTheDocument();
  });
  it("testa se ao clicar no botao de 'jogar novamente' o usuario é redirecionado para a pagina de jogo", async () => {
    const { history } =renderWithRouterAndRedux(<App />, initialState);
      act(() => history.push('/feedback'));
    localStorage.setItem('ranking', JSON.stringify([{name: "Gabriel Dota Fujita", score: 90, picture: "df69d894638aa1942aba0760dbe26f94"}]))
    const playAgain = screen.getByTestId(dataTestPlayAgain);
    userEvent.click(playAgain);
    await waitFor(() => { expect(history.location.pathname).toBe("/"), 500});
  });
  it("testa se ao clicar no botao de 'ranking' o usuario é redirecionado para a pagina de ranking", () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => history.push('/feedback'));
    const ranking = screen.getByTestId(dataTestRanking);
    userEvent.click(ranking);
    expect(history.location.pathname).toBe( "/ranking" );
  });
});

describe("testa a renderização do Header na pagina de feedback", () => {
  it("testa se o header é renderizado com o nome do jogador", () => {
    renderWithRouterAndRedux(<Feedback />);
    const header = screen.getByTestId(dataTestName);
    expect(header).toBeInTheDocument();
  });
  it("testa se o header é renderizado com a imagem do jogador", () => {
    renderWithRouterAndRedux(<Feedback />);
    const header = screen.getByTestId(dataTestPicture);
    expect(header).toBeInTheDocument();
  });
  it("testa se o header é renderizado com o score do jogador", () => {
    renderWithRouterAndRedux(<Feedback />);
    const header = screen.getByTestId(dataTestScore);
    expect(header).toBeInTheDocument();
  });
});

describe("testa o funcionamento dos botoes na pagina de feedback", () => {
  it("testa se ao clicar no botao de 'jogar novamente' o usuario é redirecionado para a pagina de jogo", () => {
     const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => history.push('/feedback'));

    const playAgain = screen.getByTestId(dataTestPlayAgain);
    userEvent.click(playAgain);
    expect(history.location.pathname).toBe( "/" );
  });
  it("testa se ao clicar no botao de 'ranking' o usuario é redirecionado para a pagina de ranking", () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => history.push('/feedback'));
    const ranking = screen.getByTestId(dataTestRanking);
    userEvent.click(ranking);
    expect(history.location.pathname).toBe( "/ranking" );
  });
  it('testa se a frase well done aparece caso acerte 4 ou mais questões,', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player:{
        name: 'Gabriel Dota Fujita',
        assertions: 4,
        score: 0,
        gravatarEmail: ''
    }});
    expect(screen.getByTestId(dataTestFeedback)).toHaveTextContent('Well Done');
  });
});
