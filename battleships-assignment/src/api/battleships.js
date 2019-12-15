const DELAY = 200;
const WIDTH = 10;
const HEIGHT = 10;
const FLEET = [
    { size: 5, count: 1 },
    { size: 4, count: 2 },
    { size: 3, count: 3 },
    { size: 2, count: 4 },
];

function forEachShipCoords (width, height, x, y, size, vertical, callback) {
    const xMin = Math.max(0, x - 1);
    const xMax = Math.min(vertical ? x + 1 : x + size, width - 1);
    const yMin = Math.max(0, y - 1);
    const yMax = Math.min(vertical ? y + size : y + 1, height - 1);

    for (let i = yMin; i <= yMax; i++) {
        for (let j = xMin; j <= xMax; j++) {
            callback(j, i);
        }
    }
}

function place (board, size) {
    for (let retries = 0; retries < 100; retries++) {
        let vertical = Boolean(Math.round(Math.random()));
        let x = Math.round(Math.random() * (vertical ? board.width - 1 : board.width - size));
        let y = Math.round(Math.random() * (vertical ? board.height - size : board.height - 1));

        let success = true;
        forEachShipCoords(board.width, board.height, x, y, size, vertical, (x, y) => {
            if (board[y][x]) {
                success = false;
            }
        });

        if (success) {
            for (let i = 0; i < size; i++) {
                if (vertical) {
                    board[y + i][x] = true;
                } else {
                    board[y][x + i] = true;
                }
            }

            return {
                size,
                x,
                y,
                vertical,
            }
        }
    }

    return null;
}

function makeBoard (width, height) {
    const board = [];
    board.width = width;
    board.height = height;
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(null);
        }
        board.push(row);
    }

    return board;
}

function generate (width, height, fleet) {
    for (let retries = 0; retries < 20; retries++) {
        const board = makeBoard(width, height);
        const placements = [];

        const success = fleet.every(({ size, count }) => {
            for (let i = 0; i < count; i++) {
                const placement = place(board, size);
                if (!placement) {
                    return false;
                }
                
                placements.push(placement);
            }
            return true;
        });

        if (success) {
            return placements;
        }
    }

    return null;
}

function shuffle (length) {
    const array = [];
    for (let index = 0; index < length; index++) {
        array[index] = index;
    }

    for (let index = length; index > 0; index--) {
        let rand = Math.floor(Math.random() * index);
        
        let temp = array[index - 1];
        array[index - 1] = array[rand];
        array[rand] = temp;
    }
  
    return array;
}

function getNextShot (board) {
    let shot = null;
    shuffle(board.width).some(x => {
        return shuffle(board.height).some(y => {
            if (board[y][x] === null) {
                shot = { x, y };
                return true;
            }
        });
    });

    return shot;
}

function searchHit (board, x, y, vertical, forward, callback = null) {
    while (true) {
        if (vertical) {
            y += forward ? 1 : -1;
            if (y < 0 || y >= board.width) {
                return null;
            }
        } else {
            x += forward ? 1 : -1;
            if (x < 0 || x >= board.width) {
                return null;
            }
        }
        const hit = board[y][x];
        if (!callback || callback(x, y, hit)) {
            return { x, y, hit };
        }
    }
}

function delay () {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * DELAY);
    });
}

let state = null;

class Battleships {
    async start (settings = {}) {
        const { width = WIDTH, height = HEIGHT, fleet = FLEET } = settings;

        if (state) {
            await delay();
            throw new Error('Game already in progress');
        }

        const myPlacements = generate(width, height, fleet);
        const theirPlacements = generate(width, height, fleet);

        if (!myPlacements || !theirPlacements) {
            await delay();
            throw new Error('Couldn\'t generate boards');
        }

        state = {
            width,
            height,
            placements: myPlacements,
            myHits: makeBoard(width, height),
            theirHits: makeBoard(width, height),
            myTurn: false,
            busy: true,
            lastHit: null,
            pendingShot: null,
        };

        await delay();
        state.busy = false;
        
        return {
            width,
            height,
            fleet,
            placements: theirPlacements,
        };
    }

    async shoot ({ x, y }) {
        if (!state) {
            await delay();
            throw new Error('No game in progress');
        } else if (state.busy) {
            await delay();
            throw new Error('Pending response');
        } else if (state.myTurn) {
            await delay();
            throw new Error('Not your turn');
        }

        state.busy = true;
        await delay();
        state.busy = false;

        if (x < 0 || y < 0 || x >= state.width || y >= state.height) {
            throw new Error('Out of range');
        }

        state.theirHits[y][x] = false;
        state.myTurn = true;

        const shipHits = {};
        let currentShipHit = -1;
        for (let i = 0; i < state.height; i++) {
            for (let j = 0; j < state.width; j++) {
                state.placements.forEach(({ x: shipX, y: shipY, vertical, size }, shipIndex) => {
                    if (vertical && (shipX != j || shipY + size <= i || shipY > i)) {
                        return;
                    } else if (!vertical && (shipY != i || shipX + size <= j || shipX > j)) {
                        return;
                    }

                    if (x == j && y == i) {
                        currentShipHit = shipIndex;
                        state.theirHits[i][j] = true;
                    }
                    if (state.theirHits[i][j]) {
                        shipHits[shipIndex] = shipHits[shipIndex] || 0;
                        shipHits[shipIndex]++;
                    }
                });
            }
        }

        if (currentShipHit == -1) {
            return {
                hit: false,
                sink: null,
            };
        }

        const hitCount = shipHits[currentShipHit];
        const ship = state.placements[currentShipHit];

        return {
            hit: true,
            sink: hitCount == ship.size ? Object.assign({}, ship) : null,
        };
    }

    async getShot () {
        if (!state) {
            await delay();
            throw new Error('No game in progress');
        } else if (state.busy) {
            await delay();
            throw new Error('Pending response');
        } else if (!state.myTurn) {
            await delay();
            throw new Error('Not my turn');
        }

        state.busy = true;
        await delay();

        let shot = null;

        if (state.lastHit) {
            const { myHits } = state;
            const { x, y } = state.lastHit;

            const left = searchHit(myHits, x, y, false, false);
            const up = searchHit(myHits, x, y, true, false);
            const right = searchHit(myHits, x, y, false, true);
            const down = searchHit(myHits, x, y, true, true);

            if (right && right.hit === null && (!left || left.hit)) {
                shot = right;
            } else if (left && left.hit === null && (!right || right.hit)) {
                shot = left;
            } else if (down && down.hit === null && (!up || up.hit)) {
                shot = down;
            } else if (up && up.hit === null && (!down || down.hit)) {
                shot = up;
            } else if (right && right.hit === false && left && left.hit) {
                shot = searchHit(myHits, x, y, false, false, (x, y, hit) => hit === null);
            } else if (left && left.hit === false && right && right.hit) {
                shot = searchHit(myHits, x, y, false, true, (x, y, hit) => hit === null);
            } else if (down && down.hit === false && up && up.hit) {
                shot = searchHit(myHits, x, y, true, false, (x, y, hit) => hit === null);
            } else if (up && up.hit === false && down && down.hit) {
                shot = searchHit(myHits, x, y, true, true, (x, y, hit) => hit === null);
            } else if (right && right.hit === null) {
                shot = right;
            } else if (left && left.hit === null) {
                shot = left;
            } else if (down && down.hit === null) {
                shot = down;
            } else if (up && up.hit === null) {
                shot = up;
            }

            if (shot) {
                shot = { x: shot.x, y: shot.y };
            }
        }

        if (!shot) {
            state.lastHit = null;
            shot = getNextShot(state.myHits);
        }

        if (!shot) {
            state.busy = false;
            throw new Error('No more squares to shoot at');
        }

        state.myTurn = false;
        state.pendingShot = shot;

        return {
            x: shot.x,
            y: shot.y,
        };
    }

    async respondShot ({ hit, sink }) {
        state.busy = false;

        if (!state) {
            await delay();
            throw new Error('No game in progress');
        } else if (!state.pendingShot) {
            await delay();
            throw new Error('No pending response');
        }

        if (sink) {
            state.lastHit = null;
            forEachShipCoords(state.width, state.height, sink.x, sink.y, sink.size, sink.vertical, (x, y) => {
                if (state.myHits[y][x] === null) {
                    state.myHits[y][x] = false;
                }
            });
        } else if (hit) {
            state.lastHit = state.pendingShot;
        }

        state.myHits[state.pendingShot.y][state.pendingShot.x] = hit;
        state.busy = false;
        state.pendingShot = null;
    }

    async finish () {
        await delay();

        if (!state) {
            throw new Error('No game in progress');
        } else if (state.busy) {
            throw new Error('Pending response');
        }

        state = null;
    }
}

export default Battleships;
