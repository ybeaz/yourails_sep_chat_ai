interface IRgetActiveCourseData {
  courseActive: any
  moduleActive: any
  questionsActive: any[]
}

/**
 * @description Function to find active module
 * @param courses
 * @returns
 */
export const getActiveCourseData: Function = (
  courses: any[]
): IRgetActiveCourseData => {
  const res = {
    courseActive: {},
    moduleActive: {},
    questionsActive: [],
  }

  try {
    const courseActive = courses.find(course => course.active === true)

    const moduleActive = courseActive.modules.find(
      module => module.active === true
    )

    const questionsActive = moduleActive ? moduleActive.questions : []

    return {
      courseActive,
      moduleActive,
      questionsActive,
    }
  } catch (error) {
    console.info('getActiveCourseData [34]', error.name + ': ' + error.message)
    return res
  }
}
