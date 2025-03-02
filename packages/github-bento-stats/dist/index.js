'use strict';

var React = require('react');
require('crypto');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var graphQL = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var authToken, response, errorData, data, error_1;
    var query = _b.query, variables = _b.variables, token = _b.token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                authToken = token;
                if (!authToken) {
                    console.warn('No GitHub token provided');
                }
                return [4 /*yield*/, fetch('https://api.github.com/graphql', {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer ".concat(authToken),
                            Accept: 'application/vnd.github+json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ query: query, variables: variables })
                    })];
            case 1:
                response = _c.sent();
                if (!!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                errorData = _c.sent();
                throw new Error("Request failed with status ".concat(response.status, ": ").concat(errorData.message));
            case 3: return [4 /*yield*/, response.json()];
            case 4:
                data = _c.sent();
                return [2 /*return*/, data.data];
            case 5:
                error_1 = _c.sent();
                console.error('GraphQL request error:', error_1);
                throw error_1;
            case 6: return [2 /*return*/];
        }
    });
}); };

function fetchYearContributions(username, year, token) {
    return __awaiter(this, void 0, void 0, function () {
        var query, startYear, endYear, data, weeks, contributionDays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    query ($user: String!, $from: DateTime!, $to: DateTime!) {\n      user(login: $user) {\n        contributionsCollection(from: $from, to: $to) {\n          contributionCalendar {\n            weeks {\n              contributionDays {\n                date\n                contributionCount\n              }\n            }\n          }\n        }\n      }\n    }\n  ";
                    startYear = "".concat(year, "-01-01T00:00:00Z");
                    endYear = "".concat(year, "-12-31T23:59:59Z");
                    return [4 /*yield*/, graphQL({
                            query: query,
                            variables: { user: username, from: startYear, to: endYear },
                            token: token
                        })];
                case 1:
                    data = _a.sent();
                    if (!data.user)
                        return [2 /*return*/, []];
                    weeks = data.user.contributionsCollection.contributionCalendar.weeks;
                    contributionDays = [];
                    weeks.forEach(function (week) {
                        week.contributionDays.forEach(function (day) {
                            contributionDays.push({ date: day.date, contributionCount: day.contributionCount });
                        });
                    });
                    return [2 /*return*/, contributionDays];
            }
        });
    });
}

var calculateTotalContributions = function (contributionDays) {
    var total = contributionDays.reduce(function (total, day) { return total + day.contributionCount; }, 0);
    return { total: total };
};
var calculateLongestStreak = function (contributionDays) {
    var longestStreak = 0, tempStreak = 0;
    var lastDate = null;
    var streakStartDate = null, streakEndDate = null;
    var longestStartDate = null, longestEndDate = null;
    for (var _i = 0, contributionDays_1 = contributionDays; _i < contributionDays_1.length; _i++) {
        var day = contributionDays_1[_i];
        var currentDate = new Date(day.date);
        if (day.contributionCount > 0) {
            if (!tempStreak)
                streakStartDate = day.date;
            if (lastDate) {
                var dayDifference = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
                if (dayDifference === 1) {
                    tempStreak++;
                    streakEndDate = day.date;
                }
                else {
                    if (tempStreak > longestStreak) {
                        longestStreak = tempStreak;
                        longestStartDate = streakStartDate;
                        longestEndDate = streakEndDate;
                    }
                    tempStreak = 1;
                    streakStartDate = day.date;
                    streakEndDate = day.date;
                }
            }
            else {
                tempStreak = 1;
                streakStartDate = day.date;
                streakEndDate = day.date;
            }
            lastDate = currentDate;
        }
        else {
            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
                longestStartDate = streakStartDate;
                longestEndDate = streakEndDate;
            }
            tempStreak = 0;
        }
    }
    if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStartDate = streakStartDate;
        longestEndDate = streakEndDate;
    }
    return {
        longestStreak: longestStreak,
        startDate: longestStartDate,
        endDate: longestEndDate,
    };
};
var calculateCurrentStreak = function (contributionDays) {
    var currentStreak = 0;
    var streakStartDate = null;
    var streakEndDate = null;
    var lastDate = new Date();
    for (var i = contributionDays.length - 1; i >= 0; i--) {
        var currentDate = new Date(contributionDays[i].date);
        var dayDifference = (lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
        if (contributionDays[i].contributionCount > 0 && dayDifference <= 1) {
            if (!currentStreak)
                streakStartDate = contributionDays[i].date;
            currentStreak++;
            streakEndDate = contributionDays[i].date;
            lastDate = currentDate;
        }
        else if (dayDifference > 1) {
            break;
        }
    }
    return { currentStreak: currentStreak, startDate: streakStartDate, endDate: streakEndDate };
};
var formatDate = function (dateString) {
    if (!dateString)
        return null;
    var date = new Date(dateString);
    var options = {
        month: "short",
        day: "numeric",
    };
    if (date.getFullYear() !== new Date().getFullYear()) {
        options.year = "numeric";
    }
    return date.toLocaleDateString("en-US", options);
};
function formatNumber(num) {
    if (num >= 1000) {
        var formatted = Math.floor(num / 1000);
        return "".concat(formatted, "k+");
    }
    return num.toString();
}

var userStatsQuery = "\n  followers {\n    totalCount\n  }\n  contributionsCollection {\n    totalCommitContributions\n  }\n  repositoriesContributedTo(\n    first: 1\n    contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]\n  ) {\n    totalCount\n  }\n  pullRequests(first: 1) {\n    totalCount\n  }\n  issues(first: 1) {\n    totalCount\n  }\n  createdAt\n  updatedAt\n  repositoriesWithStargazerCount: repositories(\n    first: 100\n    privacy: PUBLIC\n    ownerAffiliations: OWNER\n    orderBy: {field: STARGAZERS, direction: DESC}\n  ) {\n    totalCount\n    nodes {\n      stargazerCount\n    }\n  }\n  contributionsCollection {\n    contributionYears\n  }\n  avatarUrl\n";
var fetchUser = function (username, token) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, data, contibutonYears, allContributionDays, _i, contibutonYears_1, year, yearContributions, total, _a, longestStreak, longestStreakStart, longestStreakEnd, longestStreakStartDate, longestStreakEndDate, _b, currentStreak, currentStreakStart, currentStreakEnd, currentStreakStartDate, currentStreakEndDate, userStats, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                query = "\n        query ($username: String!){\n            user (login: $username) {\n                ".concat(userStatsQuery, "\n            }\n        }\n    ");
                if (!username)
                    return [2 /*return*/, { userStats: {} }];
                return [4 /*yield*/, graphQL({
                        query: query,
                        variables: { username: username },
                        token: token
                    })];
            case 1:
                response = _c.sent();
                data = response;
                if (data.user === null)
                    return [2 /*return*/, { userStats: {} }];
                contibutonYears = data.user.contributionsCollection.contributionYears;
                allContributionDays = [];
                _i = 0, contibutonYears_1 = contibutonYears;
                _c.label = 2;
            case 2:
                if (!(_i < contibutonYears_1.length)) return [3 /*break*/, 5];
                year = contibutonYears_1[_i];
                return [4 /*yield*/, fetchYearContributions(username, Number(year), token)];
            case 3:
                yearContributions = _c.sent();
                allContributionDays = allContributionDays.concat(yearContributions);
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                allContributionDays.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
                total = calculateTotalContributions(allContributionDays).total;
                _a = calculateLongestStreak(allContributionDays), longestStreak = _a.longestStreak, longestStreakStart = _a.startDate, longestStreakEnd = _a.endDate;
                longestStreakStartDate = formatDate(longestStreakStart);
                longestStreakEndDate = formatDate(longestStreakEnd);
                _b = calculateCurrentStreak(allContributionDays), currentStreak = _b.currentStreak, currentStreakStart = _b.startDate, currentStreakEnd = _b.endDate;
                currentStreakStartDate = formatDate(currentStreakStart);
                currentStreakEndDate = formatDate(currentStreakEnd);
                userStats = {
                    Followers: data.user.followers.totalCount,
                    Repositories: data.user.repositoriesWithStargazerCount.totalCount,
                    "Pull Requests": data.user.pullRequests.totalCount,
                    Issues: data.user.issues.totalCount,
                    Commits: data.user.contributionsCollection.totalCommitContributions,
                    "Contributed To": data.user.repositoriesContributedTo.totalCount,
                    "Star Earned": data.user.repositoriesWithStargazerCount.nodes.reduce(function (acc, repo) { return acc + repo.stargazerCount; }, 0),
                    "Total Contributions": total,
                    "Longest Streak": longestStreak,
                    "Longest Streak Start": longestStreakStartDate,
                    "Longest Streak End": longestStreakEndDate,
                    "Current Streak": currentStreak,
                    "Current Streak Start": currentStreakStartDate,
                    "Current Streak End": currentStreakEndDate,
                    AvatarUrl: data.user.avatarUrl,
                };
                return [2 /*return*/, {
                        userStats: userStats,
                    }];
            case 6:
                error_1 = _c.sent();
                console.log(error_1);
                return [2 /*return*/, { userStats: {} }];
            case 7: return [2 /*return*/];
        }
    });
}); };

function getFillColor(count) {
    if (count === 0)
        return "#00000090";
    if (count <= 5)
        return "#0E4429";
    if (count <= 10)
        return "#006D32";
    if (count <= 20)
        return "#26A641";
    return "#39D353";
}
var fetchGraph = function (username, token) { return __awaiter(void 0, void 0, void 0, function () {
    var today, todayStr_1, oneYearAgo, currentYear, previousYear, currentYearContributions, previousYearContributions, allContributions, oneYearAgoStr_1, lastYearContributions, dayWidth_1, dayHeight_1, dayPadding_1, weekPadding_1, svgPadding_1, startDate, startDayIndex, emptyStartDays, allDays, weeks, currentWeek, i, numWeeks, svgHeight, svgWidth, graph, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                today = new Date();
                todayStr_1 = today.toISOString().split('T')[0];
                oneYearAgo = new Date();
                oneYearAgo.setFullYear(today.getFullYear() - 1);
                oneYearAgo.setDate(today.getDate() + 1); // Add one day to make it inclusive
                currentYear = today.getFullYear();
                previousYear = oneYearAgo.getFullYear();
                return [4 /*yield*/, fetchYearContributions(username, currentYear, token)];
            case 1:
                currentYearContributions = _a.sent();
                return [4 /*yield*/, fetchYearContributions(username, previousYear, token)];
            case 2:
                previousYearContributions = _a.sent();
                allContributions = __spreadArray(__spreadArray([], previousYearContributions, true), currentYearContributions, true);
                // Sort by date
                allContributions.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
                oneYearAgoStr_1 = oneYearAgo.toISOString().split('T')[0];
                lastYearContributions = allContributions.filter(function (day) { return day.date >= oneYearAgoStr_1 && day.date <= todayStr_1; });
                if (lastYearContributions.length === 0)
                    return [2 /*return*/, { graph: "No contributions in the last year" }];
                dayWidth_1 = 10;
                dayHeight_1 = 10;
                dayPadding_1 = 2;
                weekPadding_1 = 2;
                svgPadding_1 = 0;
                startDate = new Date(lastYearContributions[0].date);
                startDayIndex = startDate.getDay();
                emptyStartDays = new Array(startDayIndex).fill({ date: '', contributionCount: 0 });
                allDays = __spreadArray(__spreadArray([], emptyStartDays, true), lastYearContributions, true);
                weeks = [];
                currentWeek = [];
                for (i = 0; i < allDays.length; i++) {
                    currentWeek.push(allDays[i]);
                    if (currentWeek.length === 7) {
                        weeks.push(currentWeek);
                        currentWeek = [];
                    }
                }
                // If there are remaining days in the current week, add them
                if (currentWeek.length > 0) {
                    // Fill the remaining days of the week with empty cells
                    while (currentWeek.length < 7) {
                        currentWeek.push({ date: '', contributionCount: 0 });
                    }
                    weeks.push(currentWeek);
                }
                numWeeks = weeks.length;
                svgHeight = 7 * (dayHeight_1 + dayPadding_1) + 2 * svgPadding_1;
                svgWidth = numWeeks * (dayWidth_1 + weekPadding_1) + 2 * svgPadding_1;
                graph = "\n    <svg width=\"".concat(svgWidth, "\" height=\"").concat(svgHeight, "\" xmlns=\"http://www.w3.org/2000/svg\">\n      ").concat(weeks
                    .map(function (week, weekIndex) {
                    return week
                        .map(function (day, dayIndex) {
                        var x = svgPadding_1 + weekIndex * (dayWidth_1 + weekPadding_1);
                        var y = svgPadding_1 + dayIndex * (dayHeight_1 + dayPadding_1);
                        var fillColor = getFillColor(day.contributionCount);
                        return "<rect x=\"".concat(x, "\" y=\"").concat(y, "\" width=\"").concat(dayWidth_1, "\" height=\"").concat(dayHeight_1, "\" fill=\"").concat(fillColor, "\" strokeWidth=\"0.5\" stroke=\"#5d5e5e20\" rx=\"2\" ry=\"2\" />");
                    })
                        .join("");
                })
                    .join(""), "\n    </svg>\n    ");
                return [2 /*return*/, {
                        graph: graph,
                    }];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, {
                        graph: "Error",
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };

// Default stats for initial render or error states
var defaultStats = {
    Followers: 0,
    Repositories: 0,
    'Pull Requests': 0,
    Issues: 0,
    Commits: 0,
    'Contributed To': 0,
    'Star Earned': 0,
    'Total Contributions': 0,
    'Longest Streak': 0,
    'Longest Streak Start': null,
    'Longest Streak End': null,
    'Current Streak': 0,
    'Current Streak Start': null,
    'Current Streak End': null,
    AvatarUrl: '',
};
var useGitHubStats = function (options) {
    var _a = options.username, username = _a === void 0 ? 'idityaGE' : _a, githubToken = options.githubToken;
    var _b = React.useState(defaultStats), stats = _b[0], setStats = _b[1];
    var _c = React.useState(null), graph = _c[0], setGraph = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = React.useState(null), error = _e[0], setError = _e[1];
    var _f = React.useState(username), currentUsername = _f[0], setCurrentUsername = _f[1];
    var fetchData = function (username, token) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, statsResult, graphResult, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!username) {
                        setError("Username is not provided");
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all([
                            fetchUser(username, token),
                            fetchGraph(username, token)
                        ])];
                case 2:
                    _a = _b.sent(), statsResult = _a[0], graphResult = _a[1];
                    // Check if we have valid data from the API
                    if (statsResult.userStats && Object.keys(statsResult.userStats).length > 0 &&
                        statsResult.userStats.Repositories !== undefined) {
                        setStats(statsResult.userStats);
                    }
                    else {
                        // Keep the default stats but set error
                        setError("Could not fetch user data");
                    }
                    if (graphResult.graph) {
                        setGraph(graphResult.graph);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    setError(err_1 instanceof Error ? err_1.message : 'Failed to fetch GitHub stats');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        // Even if token is missing, we'll attempt to fetch with whatever we have
        // The component will render with default stats
        fetchData(currentUsername, githubToken);
    }, [currentUsername, githubToken]);
    var setUsername = function (newUsername) {
        setCurrentUsername(newUsername);
    };
    var refetch = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchData(currentUsername, githubToken)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        stats: stats,
        graph: graph,
        loading: loading,
        error: error,
        username: currentUsername,
        setUsername: setUsername,
        refetch: refetch
    };
};

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Icon = React.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return React.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const createLucideIcon = (iconName, iconNode) => {
  const Component = React.forwardRef(
    ({ className, ...props }, ref) => React.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const BookMarked = createLucideIcon("BookMarked", [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Command = createLucideIcon("Command", [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Flame = createLucideIcon("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const GitMerge = createLucideIcon("GitMerge", [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9", key: "7kw0sc" }]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Trophy = createLucideIcon("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);

/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const UserRoundCheck = createLucideIcon("UserRoundCheck", [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
]);

var images = {
    assets: {
        bg3: new URL("./images/assets/bg3.png", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        bg4: new URL("./images/assets/bg4.png", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        black: new URL("./images/assets/black.png", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        frame2: new URL("./images/assets/frame2.png", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        frame2Svg: new URL("./images/assets/frame2.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        frame7: new URL("./images/assets/frame7.png", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        frame7Svg: new URL("./images/assets/frame7.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        frame9Svg: new URL("./images/assets/frame9.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grad1: new URL("./images/assets/grad1.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grad11: new URL("./images/assets/grad11.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grad2: new URL("./images/assets/grad2.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grad4: new URL("./images/assets/grad4.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grad5: new URL("./images/assets/grad5.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        grain: new URL("./images/assets/grain.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        user: new URL("./images/assets/user.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
    },
    icons: {
        issues: new URL("./images/icons/issues.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
        pr: new URL("./images/icons/pr.svg", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))).href,
    },
};

var Followers = function (_a) {
    var followers = _a.followers, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.frame2, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100" }),
        React.createElement("div", { className: "absolute top-3 left-3 max-sm:top-2 max-sm:left-2" },
            React.createElement(UserRoundCheck, { className: "size-10" }),
            React.createElement("p", { className: "font-modernbold lg:text-xl" }, "Followers")),
        React.createElement("p", { className: "font-modernbold absolute bottom-5 right-3  max-xl:right-2  max-sm:text-4xl ".concat(formatNumber(followers).toString().length >= 3 ? "max-lg:right-2 max-sm:right-1 text-5xl max-lg:text-4xl" : "max-lg:right-2 text-6xl max-lg:text-5xl", " ") }, formatNumber(followers))));
};

var LongestStreak = function (_a) {
    var streak = _a.streak, start = _a.start, end = _a.end, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-3 z-[90] bg-black/90 group cursor-pointer") },
        React.createElement("img", { src: images.assets.frame7, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl group-hover:opacity-100 opacity-[0.88] cursor-pointer" }),
        React.createElement("p", { className: "font-modernbold text-lg lg:text-xl" }, "Longest Streak"),
        React.createElement(Trophy, { className: "size-10" }),
        React.createElement("p", { className: "font-modernbold max-lg:text-6xl text-7xl" }, formatNumber(streak)),
        React.createElement("p", { className: "text-xs font-modernreg" },
            start,
            " - ",
            end)));
};

var Stars = function (_a) {
    var classname = _a.classname, stars = _a.stars;
    return (React.createElement("div", { className: "".concat(classname, " flex items-start flex-col gap-3 relative rounded-3xl overflow-hidden p-5  bg-black/90  z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grain, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-90" }),
        React.createElement("div", { className: "absolute top-5 left-5" },
            React.createElement(Sparkles, { className: "size-14  " }),
            React.createElement("p", { className: " font-modernbold text-lg " }, "Stars Earned")),
        React.createElement("p", { className: "font-modernbold max-lg:text-6xl text-7xl absolute bottom-5 right-5" }, formatNumber(stars))));
};

var CurrentStreak = function (_a) {
    var classname = _a.classname, streak = _a.streak, start = _a.start, end = _a.end;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-5 max-lg:p-3 bg-black/90 z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.frame9Svg, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 top-1 -z-10 rounded-2xl opacity-80 group-hover:opacity-100" }),
        React.createElement("div", { className: "relative items-center justify-center" },
            React.createElement("div", { className: " absolute inset-1/2 size-24 -z-10 bg-gradient-to-tr from-blue-700/70 blur-[18px] rounded-full to-blue-900/30 transform -translate-x-1/2 -translate-y-1/2 group-hover:from-blue-700/90 group-hover:to-blue-900/70" }),
            React.createElement(Flame, { className: "size-14" })),
        React.createElement("p", { className: " font-modernbold text-lg lg:text-xl " }, "Current Streak"),
        React.createElement("p", { className: "font-modernbold text-7xl  " }, formatNumber(streak)),
        React.createElement("p", { className: "text-xs font-modernreg" }, streak > 0 && start && end ? "".concat(start, " - ").concat(end) : "No current streak")));
};

var Repos = function (_a) {
    var repos = _a.repos, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grad1, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100" }),
        React.createElement("div", { className: "absolute top-3 left-3" },
            React.createElement(BookMarked, { className: "size-10" }),
            React.createElement("p", { className: "font-modernbold text-lg lg:text-xl pt-1" },
                "Repos",
                React.createElement("span", { className: "max-sm:hidden" }, "itories"))),
        React.createElement("p", { className: " font-modernbold absolute bottom-5 right-3 text-7xl max-lg:text-6xl max-sm:text-4xl ".concat(formatNumber(repos).toString().length >= 4 ? "max-sm:right-1" : "", " ") }, formatNumber(repos))));
};

var Commit = function (_a) {
    var commits = _a.commits, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grad2, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100" }),
        React.createElement("div", { className: "absolute top-5 left-5" },
            React.createElement(Command, { className: "size-10" }),
            React.createElement("p", { className: "font-modernbold text-xl pt-1" },
                "Total ",
                React.createElement("br", null),
                " Commits")),
        React.createElement("p", { className: "font-modernbold absolute bottom-5 right-5 max-lg:right-3  ".concat(formatNumber(commits).toString().length >= 4 ? "max-lg:text-5xl" : "max-lg:text-6xl", " text-7xl") }, formatNumber(commits))));
};

var PRs = function (_a) {
    var pr = _a.pr, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90  z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grad5, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100 object-right-bottom" }),
        React.createElement("div", { className: "absolute top-3 left-3" },
            React.createElement("img", { src: images.icons.pr, alt: "", width: 100, height: 100, className: "size-10" }),
            React.createElement("p", { className: "font-modernbold lg:text-xl pt-1" }, "PRs")),
        React.createElement("p", { className: " font-modernbold absolute bottom-5 right-3 max-lg:right-2  max-sm:text-4xl ".concat(formatNumber(pr).toString().length >= 3 ? "max-lg:right-1 max-lg:text-4xl text-5xl" : "max-lg:right-2 text-6xl max-lg:text-5xl", " ") }, formatNumber(pr))));
};

var Issues = function (_a) {
    var issues = _a.issues, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grad4, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-[0.75] group-hover:opacity-90" }),
        React.createElement("div", { className: "absolute top-3 left-3 max-sm:top-2 max-sm:left-2" },
            React.createElement("img", { src: images.icons.issues, alt: "", width: 100, height: 100, className: "size-10" }),
            React.createElement("p", { className: "font-modernbold lg:text-xl pt-1" }, "Issues")),
        React.createElement("p", { className: "font-modernbold absolute bottom-5 right-3  max-xl:right-2  max-sm:text-4xl ".concat(formatNumber(issues).toString().length >= 3 ? "max-lg:right-1 text-5xl max-lg:text-4xl" : "max-lg:right-2 text-6xl max-lg:text-5xl", " ") }, formatNumber(issues))));
};

var ContributedTo = function (_a) {
    var contros = _a.contros, classname = _a.classname;
    return (React.createElement("div", { className: "".concat(classname, " flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90  z-[90]  group cursor-pointer") },
        React.createElement("img", { src: images.assets.grad11, alt: "", width: 500, height: 500, className: "size-full object-cover absolute inset-0 -z-10 rounded-xl opacity-70 group-hover:opacity-100 object-left-bottom max-sm:object-right-top" }),
        React.createElement("div", { className: "absolute top-3 left-3 max-sm:top-2 max-sm:left-2 max-lg:flex max-md:block gap-2" },
            React.createElement(GitMerge, { className: "text-white size-10" }),
            React.createElement("p", { className: "font-modernbold lg:text-lg lg:pt-0" },
                "Contrib",
                React.createElement("span", { className: "sm:hidden" }, "-"),
                " uted ",
                React.createElement("br", null),
                " To:")),
        React.createElement("p", { className: "font-modernbold absolute bottom-5 right-3  text-6xl max-sm:text-4xl max-lg:text-5xl ".concat(formatNumber(contros).toString().length >= 3 ? "max-lg:right-1" : "max-lg:right-2", " ") }, formatNumber(contros))));
};

var GitHubBento = function (_a) {
    var _b = _a.username, username = _b === void 0 ? 'idityaGE' : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.showGraph, showGraph = _d === void 0 ? false : _d, githubToken = _a.githubToken;
    var _e = useGitHubStats({
        username: username,
        githubToken: githubToken
    }), stats = _e.stats, graph = _e.graph, loading = _e.loading, error = _e.error;
    if (loading) {
        return (React.createElement("div", { className: "flex items-center justify-center w-full h-full" },
            React.createElement("div", { className: "w-8 h-8 border-t-2 border-white-500 rounded-full animate-spin" })));
    }
    if (error || !stats || !stats.Repositories) {
        return (React.createElement("div", { className: "flex items-center justify-center flex-col p-10" },
            React.createElement("p", { className: "text-lg font-medium text-red-500" }, error || "GitHub user ".concat(username, " not found"))));
    }
    return (React.createElement("div", { className: "relative w-full ".concat(className) },
        React.createElement("div", { id: "github-ss", className: "relative w-full flex items-center justify-center bg-transparent" },
            React.createElement("div", { className: "text-white z-10 w-full lg:w-[100%] max-w-6xl mx-auto flex items-start justify-start flex-col p-3 relative pt-[3.5rem] " },
                React.createElement("div", { className: "flex items-center justify-center gap-4 sm:px-10 px-3  mb-2" },
                    React.createElement("div", { className: "" },
                        React.createElement("img", { src: stats.AvatarUrl || images.assets.user, alt: "User Avatar", width: 100, height: 100, className: "rounded-full size-12 -translate-y-1 object-cover" })),
                    React.createElement("h1", { className: "font-modernbold leading-tight text-3xl max-w-2xl py-1" },
                        stats.Repositories ? username : "User not found",
                        " ",
                        stats.Repositories && "'s Github.")),
                React.createElement("div", { className: "grid grid-cols-4 grid-rows-4 md:grid-cols-8 md:grid-rows-4 gap-2 w-full md:h-[600px] max-sm:min-h-[100vh]" },
                    React.createElement(LongestStreak, { streak: stats["Longest Streak"] || 0, start: stats["Longest Streak Start"] || "", end: stats["Longest Streak End"] || "", classname: "p-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 col-start-3 col-end-5 " }),
                    React.createElement(CurrentStreak, { streak: stats["Current Streak"] || 0, start: stats["Current Streak Start"] || "", end: stats["Current Streak End"] || "", classname: "p-2 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-4 col-start-2 col-end-5" }),
                    React.createElement(Followers, { followers: stats.Followers || 0, classname: "p-2 md:col-start-7 md:col-end-9 md:row-start-4 md:row-end-5 row-start-4 row-end-4 col-start-2 col-end-3" }),
                    React.createElement(Repos, { repos: stats.Repositories || 0, classname: "p-2 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-2 col-start-4 col-end-5 row-start-3 row-end-5" }),
                    React.createElement(Commit, { commits: stats["Total Contributions"] || 0, classname: "p-2 md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 col-start-1 col-end-4 row-start-3" }),
                    React.createElement(PRs, { pr: stats["Pull Requests"] || 0, classname: "p-2 md:col-start-7 md:col-end-8 md:row-start-2 md:row-end-4 col-start-1 col-end-2 row-start-2" }),
                    React.createElement(ContributedTo, { contros: stats["Contributed To"] || 0, classname: "p-2 md:col-start-3 md:col-end-5 md:row-start-4 md:row-end-5" }),
                    React.createElement(Issues, { issues: stats.Issues || 0, classname: "p-2 md:col-start-8 md:col-end-9 md:row-start-2 md:row-end-4 col-start-1 row-start-4" }),
                    React.createElement(Stars, { stars: stats["Star Earned"] || 0, classname: "p-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-3 row-start-1" })),
                showGraph && (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "max-sm:px-5 mt-2 w-full max-w-2xl flex mx-auto" },
                        React.createElement("h1", { className: "max-w-2xl w-full font-modernbold text-2xl mb-2" }, "Contribution Graph:")),
                    React.createElement("div", { className: "px-5 rounded-2xl w-full mx-auto flex flex-col relative overflow-auto" },
                        React.createElement("div", { className: "relative max-w-2xl mx-auto" },
                            React.createElement("div", { className: "bg-zinc-800/20 backdrop-blur-2xl border border-zinc-200/10 backdrop-saturate-200 p-3 rounded-2xl mx-auto overflow-auto max-w-2xl opacity-95 hover:opacity-100 z-[9999] cursor-pointer", dangerouslySetInnerHTML: {
                                    __html: graph || "",
                                } })))))))));
};

exports.Commit = Commit;
exports.ContributedTo = ContributedTo;
exports.CurrentStreak = CurrentStreak;
exports.Followers = Followers;
exports.GitHubBento = GitHubBento;
exports.Issues = Issues;
exports.LongestStreak = LongestStreak;
exports.PRs = PRs;
exports.Repos = Repos;
exports.Stars = Stars;
exports.useGitHubStats = useGitHubStats;
//# sourceMappingURL=index.js.map
