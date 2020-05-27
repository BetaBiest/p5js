class Position {
    _global_pos = {'x': null, 'y': null};
    _screen_pos = {'x': null, 'y': null};
    last_global_scale;
    last_global_offset;

    constructor(x = 0., y = 0.) {
        this._global_pos.x = x;
        this._global_pos.y = y;
    }

    screen_pos() { // TODO check functionality
        if (this.last_global_offset != global_offset || this.last_global_scale != global_scale) {
            this.gTs();
            this.last_global_offset = global_offset;
            this.last_global_scale = global_scale;
        }
        return this._screen_pos;
    }

    global_pos() {
        return this._global_pos;
    }

    setGlobalPos(x, y) {
        this._global_pos.x = x;
        this._global_pos.y = y;
    }

    gTs() { // TODO check functionality
        this._screen_pos.x = int((this._global_pos.x - global_offset.x) * global_scale);
        this._screen_pos.y = int((this._global_pos.y - global_offset.y) * global_scale);
    }

    sTg() { // TODO check functionality
        this._global_pos.x = (this._screen_pos.x / global_scale + global_offset.x);
        this._global_pos.y = (this._screen_pos.y / global_scale + global_offset.y);
    }


    static global_scale = {'x': 1, 'y': 1};
    static global_offset = {'x': 0, 'y': 0};
    static mouse_offset = {'x': 0, 'y': 0};

    static zoom(factor) {
        // TODO global zooming 1
    }
    static zoom(factor_x, factor_y) {
        // TODO global zooming 2
    }

    static pan() {
        // TODO global panning
    }
}