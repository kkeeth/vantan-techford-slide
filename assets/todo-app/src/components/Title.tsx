type TitleProps = {
  str: string;
};

const Title = ({ str }: TitleProps) => {
  return <h1>{ str }</h1>
};

export default Title;