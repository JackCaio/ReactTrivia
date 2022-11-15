import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Feedback from "../pages/Feedback";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

const dataTestFeedback = "feedback-text";
const dataTestPlayAgain = "btn-play-again";
const dataTestRanking = "btn-ranking";
const dataTestEmail = "input-gravatar-email";
const dataTestName = "header-player-name";
const dataTestPlay = "btn-play";
const dataTestPicture = "header-profile-picture";
const dataTestPlayerName = "header-player-name";
const dataTestScore = "header-score";




describe("Testes relacionados á página de feedBack" , () => {
  it( "Testa se a página de feedback é renderizada" , () => {
    renderWithRouterAndRedux(<Feedback />)
    const feedback = screen.getByTestId(dataTestFeedback);
    expect(feedback).toBeInTheDocument();
  });
  it( "Testa se o botão de jogar novamente é renderizado" , () => {
    renderWithRouterAndRedux(<Feedback />)
    const playAgain = screen.getByTestId(dataTestPlayAgain);
    expect(playAgain).toBeInTheDocument();
  });
  it( "Testa se o botão de ranking é renderizado" , () => {
    renderWithRouterAndRedux(<Feedback />)
    const ranking = screen.getByTestId(dataTestRanking);
    expect(ranking).toBeInTheDocument();
  });
  it("testa se ao clicar no botao de 'jogar novamente' o usuario é redirecionado para a pagina de jogo", () => {
    renderWithRouterAndRedux(<Feedback />)
    const playAgain = screen.getByTestId(dataTestPlayAgain);
    userEvent.click(playAgain);
    expect(history.location.pathname).toBe( "/" );
  });
  it("testa se ao clicar no botao de 'ranking' o usuario é redirecionado para a pagina de ranking", () => {
    renderWithRouterAndRedux(<Feedback />)
    const ranking = screen.getByTestId(dataTestRanking);
    userEvent.click(ranking);
    expect(history.location.pathname).toBe( "/ranking" );
  });
});

describe("testa a renderização do Header na pagina de feedback", () => {
  it("testa se o header é renderizado", () => {
    renderWithRouterAndRedux(<Feedback />)
    const header = screen.getByTestId(dataTestEmail);
    expect(header).toBeInTheDocument();
  });
  it("testa se o header é renderizado com o nome do jogador", () => {
    renderWithRouterAndRedux(<Feedback />)
    const header = screen.getByTestId(dataTestName);
    expect(header).toBeInTheDocument();
  });
  it("testa se o header é renderizado com a imagem do jogador", () => {
    renderWithRouterAndRedux(<Feedback />)
    const header = screen.getByTestId(dataTestPicture);
    expect(header).toBeInTheDocument();
  });
  it("testa se o header é renderizado com o score do jogador", () => {
    renderWithRouterAndRedux(<Feedback />)
    const header = screen.getByTestId(dataTestScore);
    expect(header).toBeInTheDocument();
  });

});

describe("testa o funcionamento dos botoes na pagina de feedback", () => {
  it("testa se ao clicar no botao de 'jogar novamente' o usuario é redirecionado para a pagina de jogo", () => {
    renderWithRouterAndRedux(<Feedback />)
    const playAgain = screen.getByTestId(dataTestPlayAgain);
    userEvent.click(playAgain);
    expect(history.location.pathname).toBe( "/" );
  });
  it("testa se ao clicar no botao de 'ranking' o usuario é redirecionado para a pagina de ranking", () => {
    renderWithRouterAndRedux(<Feedback />)
    const ranking = screen.getByTestId(dataTestRanking);
    userEvent.click(ranking);
    expect(history.location.pathname).toBe( "/ranking" );
  });
});
