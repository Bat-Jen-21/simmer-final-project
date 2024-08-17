def decode(coded_list):
    decoded_list = []
    # Decode both the spaces and new lines to form a list
    for line in coded_list:
        lines = line.split("%%")
    for space in lines:
        decoded_list.append(space.strip("`^").split("`^"))
    return(decoded_list)

# Almost go tthis working