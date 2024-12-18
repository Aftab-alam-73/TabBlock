import { useSelector } from 'react-redux'
import { RootState } from '../redux/state/store'
 const User = () => {
    const user=useSelector((state:RootState)=>state.user)
  return (
    <div className='flex  items-center justify-center gap-2 '>
        <img src={user.profile} alt="profile image"  className='w-8 h-8 rounded-full'/>
        <span className='font-semibold text-white'>{user.username}</span>
    </div>
  )
}

export default User