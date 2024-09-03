import { GoAlertFill } from "react-icons/go";
const ErrorPage = () => {
  return (
    <div className=" flex justify-center space-x-20 h-100vh mt-64" >
        <GoAlertFill size={60} color="orange" />
        <h1 className=" text-4xl font-poppins font-bold" > Invalid Page </h1>
    </div>
  )
}

export default ErrorPage