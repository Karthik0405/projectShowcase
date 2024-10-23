import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const userStatus = {
  initail: 'INITIAL',
  inProgeress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    catgeoryItem: categoriesList[0].id,
    projectsList: [],
    statusIs: userStatus.initail,
  }

  componentDidMount() {
    this.gettingProjects()
  }

  gettingProjects = async () => {
    this.setState({
      statusIs: userStatus.inProgeress,
    })
    const {catgeoryItem} = this.state
    const url = ` https://apis.ccbp.in/ps/projects?category=${catgeoryItem}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const projects = data.projects
      const updatedProjects = projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projectsList: updatedProjects,
        statusIs: userStatus.success,
      })
    } else {
      this.setState({
        statusIs: userStatus.failure,
      })
    }
  }

  changeValue = e => {
    console.log(e.target.value)
    this.setState(
      {
        catgeoryItem: e.target.value,
      },
      this.gettingProjects,
    )
  }

  renderSuccess = () => {
    const {projectsList} = this.state
    return (
      <>
        <ul className="list-item-container">
          {projectsList.map(eachItem => (
            <ProjectItem eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para ">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.gettingProjects}
      >
        Retry
      </button>
    </div>
  )

  renderLoder = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color=" #328af2"
        height="50"
        width="50"
        className="loader"
      />
    </div>
  )

  renderResult = () => {
    const {statusIs} = this.state
    switch (statusIs) {
      case userStatus.inProgeress:
        return this.renderLoder()
      case userStatus.success:
        return this.renderSuccess()
      case userStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <div className="items-container">
          <select className="select-item" onChange={this.changeValue}>
            {categoriesList.map(eachItem => (
              <option
                key={eachItem.id}
                value={eachItem.id}
                className="option-item"
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {this.renderResult()}
        </div>
      </div>
    )
  }
}

export default Home
