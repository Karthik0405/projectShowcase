import './index.css'

const ProjectItem = props => {
  const {eachItem} = props
  const {id, name, imageUrl} = eachItem
  return (
    <li className="each-item-container">
      <img src={imageUrl} alt={name} className="project-image" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectItem
