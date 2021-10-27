from robot.api import ExecutionResult, ResultVisitor


class ResultCollector(ResultVisitor):

    def __init__(self):
        self.test_cases = []

    def visit_test(self, test):
        test_cases_result = {
            'status': test.status,
            'name': test.name,
            'tags': test.tags,
        }
        self.test_cases.append(test_cases_result)


if __name__ == "__main__":
    output_file = './test_logs/output.xml'

    results = ExecutionResult(output_file)

    rc = ResultCollector()
    results.visit(rc)
    print(rc.test_cases) 