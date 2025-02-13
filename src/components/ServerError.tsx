type Props = {
    message: string;
}

const ServerError = ({ message }: Props) => {
  return (
    <p className="text-red-600 text-sm text-center font-bold mb-1 capitalize">{message}</p>
  )
}

export default ServerError;
