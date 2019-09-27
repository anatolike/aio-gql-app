import useRouter from "use-react-router";


export default function useNavigator() {
  const {location: { search }, history} = useRouter();

  return (url, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + search : url;
    replace ? history.replace(targetUrl) : history.push(targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
