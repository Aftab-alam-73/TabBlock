import { AppType } from '../types/type'

const AppCard = ({app}:{app:AppType}) => {
  return (
    <div className='flex flex-col gap-5 shadow-lg w-80 p-4 rounded-md '>
        <h1 className='font-bold'>APP NAME: <span className='font-semibold'>{app?.app_name}</span></h1>
        <h1 className='font-bold'>APP ID: <span className='font-semibold'>{app?.id}</span></h1>
       
  
    </div>
  )
}

export default AppCard