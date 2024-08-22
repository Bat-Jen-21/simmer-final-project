def decode(coded_list):
    decoded_list = []
    # Decode both the spaces and new lines to form a list
    for line in coded_list:
        lines = line.split("`^")
    for space in lines:
        add = space.strip("%%").split("%%")
        if add[0] != "":
            decoded_list.append(add)
    return(decoded_list)
