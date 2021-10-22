import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

type CategoryContextData = {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<SetStateAction<number>>
  selectedGenre: GenreResponseProps;
  movies:MovieProps[];
};

type CategoryProviderProps = {
  children: ReactNode;
};

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

const CategoryContext = createContext({} as CategoryContextData);

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <CategoryContext.Provider
      value={{ genres, selectedGenreId, setSelectedGenreId , selectedGenre,movies}}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
