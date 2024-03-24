import { useContext } from "react";
import classes from './NewsFeed.module.css';
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../UI/Theme/Theme";
import { useRouteLoaderData } from "react-router-dom";

const NewsFeed = () => {
  const userDetailsObj = useRouteLoaderData("userDetails");
  const currentUserDetails = userDetailsObj.result[1];
  const currentUserRole = userDetailsObj.result[0];

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={classes["newsfeed"]}>
        <span>currently logged in as {currentUserRole} </span>
        <p>This is the NewsFeed</p>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet
          et massa venenatis molestie. Pellentesque facilisis lacinia nunc id
          suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna
          lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus
          id dapibus sapien. Sed facilisis dui erat, sit amet consequat nulla
          tempus non. Morbi pretium quam at odio rhoncus suscipit. Aliquam
          ornare eget arcu quis imperdiet. In non purus ac ligula volutpat
          euismod. Aenean vel euismod ligula, sed vehicula sapien. Morbi
          suscipit volutpat magna. Nam quis dolor ligula. Cras pulvinar, odio eu
          pulvinar molestie, dui tellus euismod arcu, eget dictum tellus augue
          laoreet risus. Ut vitae risus pharetra, pellentesque arcu in, semper
          diam. Sed aliquet lacus vitae odio gravida, sit amet pharetra turpis
          rutrum. Curabitur vitae sapien placerat, vehicula ipsum et, bibendum
          risus. Proin dictum mattis nisl sit amet hendrerit. Maecenas
          ullamcorper in justo in consequat. Mauris tempus eros id nisl
          fringilla, eu consequat est fermentum. Mauris tincidunt nibh diam, a
          consectetur ligula laoreet venenatis. Sed vestibulum eleifend
          molestie. Nulla finibus sem in purus volutpat tempor sed et diam.
          Suspendisse feugiat ipsum turpis, sit amet varius orci sodales
          interdum. Donec in ornare arcu. Phasellus in mollis metus. Curabitur
          ullamcorper vitae erat facilisis elementum. Aliquam consequat nulla in
          metus faucibus accumsan. Proin eu justo nec nisl rhoncus mollis et vel
          lorem. Vivamus ultricies, nibh sed ullamcorper porttitor, purus ligula
          sollicitudin risus, nec efficitur sapien sem a sapien. Curabitur lacus
          justo, malesuada et iaculis a, consequat sed velit. Pellentesque erat
          mi, viverra in elementum id, feugiat mattis magna. Vestibulum
          facilisis odio eu ornare posuere. Fusce tincidunt volutpat volutpat.
          Sed dapibus pharetra nunc, sit amet mollis diam pharetra id. Nulla id
          justo ligula. Nam ullamcorper elementum tellus, vitae dignissim nulla
          interdum id. Vestibulum fermentum augue id nisl tincidunt, eget
          aliquam mauris consectetur. Aenean interdum semper eros, ac
          ullamcorper enim mollis at. Proin vitae dolor dictum, iaculis dui ac,
          venenatis ex. Nullam rhoncus fringilla nibh id elementum. Cras ac
          rutrum mauris, et condimentum felis. Maecenas vitae tristique nunc.
          Proin elit ante, viverra id dui in, vestibulum maximus dolor. Mauris
          eget libero in nulla lobortis finibus quis eget justo. Quisque luctus
          eu quam vel condimentum. Duis iaculis, lacus sit amet varius accumsan,
          sapien elit facilisis sem, et convallis risus dolor fringilla felis.
          Integer tellus neque, congue at posuere quis, pretium at eros. Integer
          varius sem in facilisis commodo. In ac egestas dolor, vel commodo
          tortor. Donec sagittis ullamcorper tempor. Mauris et malesuada urna.
          Vestibulum feugiat libero eu metus sodales, sed blandit libero
          efficitur. Donec eget commodo odio. Donec dignissim justo eros, id
          pharetra justo imperdiet ac. Vestibulum vel luctus dolor, in gravida
          mauris. Vivamus cursus, massa ut dignissim volutpat, mauris felis
          viverra urna, in rhoncus urna risus sed lorem. Proin sollicitudin
          scelerisque ligula a pretium. Aliquam erat volutpat. Donec sed erat
          eros. Proin vitae tempus leo. Donec eleifend ipsum ut elit aliquam
          efficitur. Morbi lacinia laoreet luctus. Morbi dictum orci sapien, vel
          faucibus purus consectetur sit amet. Sed elementum euismod vulputate.
          Nullam in ullamcorper lectus, non aliquet purus. Suspendisse blandit
          et neque semper ornare. Aliquam sit amet ex a arcu congue varius. Sed
          id ipsum mi. Vestibulum et enim nunc. Donec quis luctus quam, at
          malesuada tellus. Nulla faucibus posuere commodo. Quisque id sapien
          tempus, pretium odio vitae, porta erat. Fusce at condimentum ipsum.
          Cras posuere felis metus. Suspendisse sit amet neque blandit ligula
          semper suscipit a tincidunt nulla. Nam erat tellus, vehicula a
          eleifend vel, auctor et odio. Sed maximus quam non odio tincidunt
          scelerisque. Nulla vel lacus ex. Suspendisse dictum felis ut ex
          fringilla, in dapibus tellus luctus. Morbi risus dui, elementum et
          lectus eget, fermentum convallis erat. Nullam ut tortor mi. Etiam
          tincidunt nibh vel porta pretium. Nulla non imperdiet tellus. Sed
          neque tortor, vulputate quis orci nec, congue elementum urna. Nullam
          eget tellus ut nulla scelerisque placerat. Suspendisse vel mi risus.
          Integer imperdiet posuere egestas. Quisque quis viverra mi. Proin at
          augue euismod, fermentum diam sit amet, efficitur urna. Donec quis
          posuere lacus, eget facilisis ex. Phasellus at eros dictum arcu
          finibus rhoncus. Aenean quis aliquet nisl. Suspendisse potenti. Morbi
          tortor magna, pharetra non convallis a, ultrices quis mauris. In
          tincidunt nunc nulla, commodo luctus ex bibendum nec. Mauris sit amet
          diam in mi tincidunt congue. Fusce consectetur eget metus non laoreet.
          Nulla vel placerat velit. Cras venenatis facilisis velit, ac rhoncus
          magna consectetur et. Duis maximus tortor eu interdum iaculis. Sed sit
          amet neque justo. Phasellus lacinia dui id convallis varius. Nam justo
          elit, placerat et porttitor vitae, tincidunt sed mi.
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
