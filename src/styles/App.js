import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  background-image: url('https://picserio.com/data/out/166/pokeball-background_3828661.png');
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-fmaily: sans-serif;
  color: #333;
`;

export const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  font-family: sans-serif;
`;

export const ListItem = styled.li`
  margin: 0.5rem 0;
  background: #000;
  color: #fff;
  padding: 0.5rem;
`;

export const LinkHome = styled(Link)`
  display: block;
  width: 4rem;
  text-align: center;
  margin: 2rem auto;
  background-color: #000;
  padding: 0.5rem 0;
  color: #fff;
  text-decoration: none;
`;

export const Footer = styled.footer`
  display: block;
  text-align: center;
  margin: 2rem auto;
  background-color: #fff;
  padding: 3rem 0;
  color: #000;
  text-decoration: none;
`;
