const Alert = ({ result }) => {
  if (result?.success)
    return (
      <p className="text-green-500 text-sm font-semibold">{result?.message}</p>
    );

  if (!result?.success)
    return (
      <p className="text-destructive text-sm font-semibold">
        {result?.message}
      </p>
    );
};

export default Alert;
